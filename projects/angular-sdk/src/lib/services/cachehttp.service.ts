import { Injectable, Inject } from '@angular/core'
import { defer } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { publishReplay, refCount, take } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class CacheHttpService {
    private _default_timeout: number = 1000
    private timeout_get_map = new Map()
    private observable_get_map = new Map()

    constructor(private http: HttpClient) {}

    /**
     * Take an url and cache the observable until timeout
     *
     * @param url to be cached
     * @param timeout until new cached
     */
    get<T>(url: string, timeout: number = 0): any {
        timeout = timeout ? timeout : this._default_timeout

        if (
            !this.observable_get_map.get(url) ||
            this.timeout_get_map.get(url) != timeout
        ) {
            this.timeout_get_map.set(url, timeout)
            this.observable_get_map.set(
                url,
                defer(() => this.http.get<T>(url)).pipe(
                    publishReplay(1, timeout),
                    refCount(),
                    take(1)
                )
            )
        }
        return this.observable_get_map.get(url)
    }

    /**
     * Define default_timeout
     *
     * @param value to default_timeout
     */
    public set_default_timeout(value: number) {
        this._default_timeout = value
    }

    /**
     * Retrieve default_timeout
     */
    public get_default_timeout(): number {
        return this._default_timeout
    }
}
