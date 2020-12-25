import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmInjectorModule, IManifestCollection } from 'dm-module-injector';
import { TranslateModule } from '@ngx-translate/core';
import { DmIconInjectorModule } from 'dm-icon-injector';
import { DmEmailPopupComponent } from './email-popup.component';
import { DmButtonModule } from 'dm-button';
import { FormsModule } from '@angular/forms';
import { EmailPopupService } from './email-popup.service';

export const manifest: IManifestCollection = [
    { path: 'emailPopup', component: DmEmailPopupComponent },
    { path: 'ta-email-lookup', loadChildren: () => import('../lookup-framework/lookup.module').then((m) => m.AgGridLookupFrameworkModule) }
];

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        DmIconInjectorModule,
        DmButtonModule,
        FormsModule,
        DmInjectorModule.forChild(manifest)
    ],
    declarations: [DmEmailPopupComponent],
    providers: [EmailPopupService]
})
export class DmEmailPopupModule { }