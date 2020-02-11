import { NgModule } from '@angular/core'
import { CoreModule } from './core/core.module'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
    declarations: [],
    imports: [CoreModule, HttpClientModule],
    exports: [CoreModule]
})
export class AngularSdkModule {}
