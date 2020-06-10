import { Routes, RouterModule } from '@angular/router';
import { ktvHomeComponent } from './ktv-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
    { path: '', component: ktvHomeComponent },
];
@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class ktvHomeModule { }
