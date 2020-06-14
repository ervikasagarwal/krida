import { NgModule } from '@angular/core';


import { IconInjectorService } from './icon-injector.service';
import { IconInjectorDirective } from './icon-injector.directive';


@NgModule({
  imports: [],
  declarations: [
    IconInjectorDirective
  ],
  exports: [IconInjectorDirective],
  providers: [IconInjectorService]
})
export class IconInjectorModule { }
