import { SharedModule } from '@nexxe/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectableAssetsCollection } from '@nexxe/plugin-injector';
import { ImCommonGridLookupFrameworkComponent } from './im-common-grid-lookup-framework.component';

// Injectable Assets is a map of exposable assets [e.g. components, config, etc.], by a plugin.
// If a plugin is exposing a single component, the name could be empty to ease metadata composition.
// If a plugin is exposing multiple components, the default component could be empty but other components must specify a name.
// If a plugin is not exposing any assets, one could remove the assets collection entirely
const assets: InjectableAssetsCollection = [
  { type: 'component', name: '', asset: ImCommonGridLookupFrameworkComponent },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ImCommonGridLookupFrameworkComponent,
  ],
  declarations: [
    ImCommonGridLookupFrameworkComponent,
  ],
  providers: [
    { provide: 'im-common-grid-lookup-framework_assets', useValue: assets, multi: true },
  ],
  entryComponents: [
    ImCommonGridLookupFrameworkComponent,
  ],
})
export class ImCommonGridLookupFrameworkModule {
  constructor() { }
}
