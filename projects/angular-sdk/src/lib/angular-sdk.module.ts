import { NgModule, InjectionToken } from '@angular/core'
import { CoreModule } from './core/core.module'
import { HttpClientModule } from '@angular/common/http'

export const BASE_URL = new InjectionToken<string>('BASE_URL')

@NgModule({
    declarations: [],
    imports: [CoreModule, HttpClientModule],
    exports: [CoreModule]
})
export class AngularSdkModule {
    static forRoot(env_str: string) {
        let base_url
        switch (env_str) {
            case 'beta':
                base_url = 'https://api-beta.musicplayce.com'
                break
            case 'sandbox':
                base_url = 'https://api-sandbox.musicplayce.com'
                break
            case 'dev':
                base_url = 'http://localhost:3000'
                break
            default:
                base_url = 'https://api.musicplayce.com'
                break
        }
        return {
            ngModule: AngularSdkModule,
            providers: [
                {
                    provide: BASE_URL,
                    useValue: base_url
                }
            ]
        }
    }
}
