import { RouterModule } from '@angular/router';
import { KridaTvHeaderComponent } from './ktv-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule
    ],
    declarations: [KridaTvHeaderComponent],
    exports: [KridaTvHeaderComponent],
    providers: []
})
export class KridaTvHeaderModule { 
    constructor(){
    }
}
