import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { HttpClientModule } from '@angular/common/http';
import { localeText as enLocale } from '../../assets/locale_files/en';
import { localeText as hindiLocale } from '../../assets/locale_files/hin';

declare var lang: any;

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot()
  ],
  providers: [],
  exports: [TranslateModule]

})
export class SharedTranslateModule {
  constructor(private translate: TranslateService) {
    this.translate.setTranslation("en", enLocale);
    this.translate.setTranslation("hindi", hindiLocale);
    this.translate.use(lang);
  }

}
