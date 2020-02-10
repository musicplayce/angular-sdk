import { NgModule, Optional, SkipSelf } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor'
import { throwIfAlreadyLoaded } from './guard/module-import.guard'

@NgModule({
    imports: [HttpClientModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RefreshTokenInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        console.log('constructor coremodule')
        throwIfAlreadyLoaded(parentModule, 'CoreModule')
    }
}
