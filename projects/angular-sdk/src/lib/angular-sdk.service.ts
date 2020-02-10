import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AngularSdkService {
    constructor(private httpClient: HttpClient) {}

    public convert(value: string): string {
        return `-- ${value} --`
    }

    public getAuth(): Observable<any> {
        return this.httpClient.get(
            'https://api-sandbox.musicplayce.com/v1/auth/ms/'
        )
    }
}
