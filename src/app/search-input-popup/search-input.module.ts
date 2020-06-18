import { RouterModule } from '@angular/router';
import { SearchInputPopupComponent } from './search-input.component';
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
    declarations: [SearchInputPopupComponent],
    exports: [SearchInputPopupComponent],
    providers: []
})
export class SearchInputPopupModule {
    constructor() {
    }
}
