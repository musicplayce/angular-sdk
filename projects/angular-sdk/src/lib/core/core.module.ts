import {
    NgModule,
    Optional,
    SkipSelf,
    ModuleWithProviders
} from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor'
import { throwIfAlreadyLoaded } from './guard/module-import.guard'
import { AuthService } from './service/auth.service'

@NgModule({
    imports: [HttpClientModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RefreshTokenInterceptor,
            multi: true
        }
    ],
    exports: []
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [AuthService]
        }
    }
}
