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
    static forRoot(base_url: string, cookie_domain) {
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
