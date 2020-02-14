import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { BASE_URL } from './angular-sdk.module'

@Injectable({
    providedIn: 'root'
})
export class AngularSdkService {
    public BASE_URL: string
    constructor(
        @Inject(BASE_URL) base_url_injected: string,
        private httpClient: HttpClient
    ) {
        this.BASE_URL = base_url_injected
    }

    public convert(value: string): string {
        return `-- ${value} --`
    }

    public getAuth(): Observable<any> {
        return this.httpClient.get(this.BASE_URL + '/v1/auth/me/')
    }
}
