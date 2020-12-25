import { KridaTvHeaderComponent } from './ktv-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconInjectorModule } from 'src/core/modules/icon-injector/app.module';
import { AgGridLookupFrameworkModule } from 'src/core/modules/lookup-framework/lookup.module';
@NgModule({
    imports: [
        AgGridLookupFrameworkModule,
        CommonModule,
        TranslateModule,
        IconInjectorModule,
    ],
    declarations: [KridaTvHeaderComponent],
    exports: [KridaTvHeaderComponent],
    providers: []
})
export class KridaTvHeaderModule { 
    constructor(){}
}
