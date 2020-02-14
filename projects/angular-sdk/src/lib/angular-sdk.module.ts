import { NgModule, InjectionToken } from '@angular/core'
import { CoreModule } from './core/core.module'
import { HttpClientModule } from '@angular/common/http'

export const BASE_URL = new InjectionToken<string>('BASE_URL')
export const COOKIE_DOMAIN = new InjectionToken<string>('CO0KIE_DOMAIN')

@NgModule({
    declarations: [],
    imports: [CoreModule, HttpClientModule],
    exports: [CoreModule]
})
export class AngularSdkModule {
    static forRoot(env_str: string) {
        let base_url: string
        let cookie_domain: string
        switch (env_str) {
            case 'beta':
                base_url = 'https://api-beta.musicplayce.com'
                cookie_domain = '.musicplayce.com'
                break
            case 'sandbox':
                base_url = 'https://api-sandbox.musicplayce.com'
                cookie_domain = '.musicplayce.com'
                break
            case 'dev':
                base_url = 'http://localhost:3000'
                cookie_domain = 'localhost'
                break
            case 'test':
                base_url = 'https://api.musicplayce.com'
                cookie_domain = 'localhost'
                break
            default:
                base_url = 'https://api.musicplayce.com'
                cookie_domain = '.musicplayce.com'
                break
        }
        return {
            ngModule: AngularSdkModule,
            providers: [
                {
                    provide: BASE_URL,
                    useValue: base_url
                },
                {
                    provide: COOKIE_DOMAIN,
                    useValue: cookie_domain
                }
            ]
        }
    }
}
