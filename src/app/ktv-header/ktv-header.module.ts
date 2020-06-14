import { RouterModule } from '@angular/router';
import { KridaTvHeaderComponent } from './ktv-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconInjectorModule } from 'src/core/modules/icon-injector/app.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        IconInjectorModule
    ],
    declarations: [KridaTvHeaderComponent],
    exports: [KridaTvHeaderComponent],
    providers: []
})
export class KridaTvHeaderModule { 
    constructor(){
    }
}
