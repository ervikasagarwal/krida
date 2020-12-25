import { UserLookupService } from './user-lookup.service';
import { DmButtonModule } from 'dm-button';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DmIconInjectorModule } from 'dm-icon-injector';
import { NgModule } from '@angular/core';
import { IManifestCollection, DmInjectorModule } from 'dm-module-injector';
import { UserLookupPopupComponent } from './user-lookup.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IconTextPipe } from './format-value.pipe';

const manifest: IManifestCollection = [
    { path: 'lookup', component: UserLookupPopupComponent },
];

const routes: Routes = [
    {
        path: '',
        component: UserLookupPopupComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        DmIconInjectorModule,
        ReactiveFormsModule,
        MatInputModule,
        DmButtonModule,
        MatFormFieldModule,
        FormsModule,
        DmInjectorModule.forChild(manifest),
        RouterModule.forChild(routes)
    ],
    providers: [UserLookupService],
    declarations: [UserLookupPopupComponent, IconTextPipe],
    entryComponents: [UserLookupPopupComponent]
})
export class UserLookupPopupModule { }
