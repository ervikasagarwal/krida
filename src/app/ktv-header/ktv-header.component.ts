import { ConstantsService } from './../../core/services/constants.services';
import { ILookupConfig, FieldTypes } from './../../core/modules/lookup-framework/lookup.model';
import { Language, LanguageId } from './../../assets/constants/app.enum';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewContainerRef, TemplateRef, Renderer2, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';
import { MediaMatcher, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { LookupFrameworkSetter } from 'src/core/modules/lookup-framework/lookup.model';
import { TranslateService } from '@ngx-translate/core';
import { Option } from 'src/assets/interfaces/ktv-header.model';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'ktv-header',
  templateUrl: './ktv-header.component.html',
  styleUrls: ['./ktv-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class KridaTvHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private renderer2: Renderer2,
    public mediaMatcher: MediaMatcher,
    public translate: TranslateService,
    public constantsService: ConstantsService,
    public changeDetectorRef: ChangeDetectorRef
  ) { }
  @ViewChild('NavSlideContainer', { read: ViewContainerRef, static: true }) NavSlideContainerRef: ViewContainerRef;
  @ViewChild('NavSlideTemplate', { static: true }) NavSlideTemplateRef: TemplateRef<any>;
  @ViewChild('searchBoxContainer', { static: true }) searchBoxContainerElementRef: ElementRef<any>;
  @ViewChild('searchCloseIcon', { static: true }) searchCloseIconElementRef: ElementRef<any>;

  private streamSubscription: Subscription;
  lang;
  browserLang;
  ngOnInit() {
    this.translate.addLangs(this.constantsService.languages);
    this.translate.setDefaultLang(Language.English);
    this.constantsService.selectedLanguage.next(Language.English);
    this.streamSubscription = new Subscription();
    this.streamSubscription.add(this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          if (this.searchOpened) {
            this.renderer2.addClass(this.searchBoxContainerElementRef.nativeElement, 'search-box-container-open-mobile');
          }
        }
        else {
          if (this.searchOpened) {
            this.renderer2.addClass(this.searchBoxContainerElementRef.nativeElement, 'search-box-container-open');
          }
        }
      }));

    this.constantsService.selectedLanguage.subscribe((lang) => {
      this.languageChanged(lang);
    })
  }

  languageChanged(selectedLanguage) {
    debugger;
    this.translate.use(this.constantsService.languages.includes(selectedLanguage) ? selectedLanguage : Language.English);
  }

  onMenuBtnClick(e) {
    e.preventDefault();
    this.loadNavSlideElement();
  }


  scope = this;
  params: ILookupConfig = {
    type: FieldTypes.Select,
    disabled: false,
    invalid: false,
    model: {
      key: 'id',
      value: 'title'
    },
    displayFormat: "value",
    optionsFormat: "value",
    events: {
      onSelect: 'onLanguageSelect',
      onComponentInit: 'onLanguageSelectComponentInit'
    },
    options: [
      { id: 1, title: "English" },
      { id: 2, title: "Hindi" }
    ],
    value: { id: 1, title: "English" },
    scope: this
  }

  onLanguageSelect = (selectedOption: Option, params) => {
    if (selectedOption.id == LanguageId.Hindi) {
      this.constantsService.selectedLanguage.next(Language.Hindi);
    } else {
      this.constantsService.selectedLanguage.next(Language.English);
    }
  }

  onLanguageSelectComponentInit = (params) => {
    params[LookupFrameworkSetter.SetValue]({ id: 1, title: "English" });
    this.changeDetectorRef.detectChanges();
  }

  searchOpened: boolean = false;
  onSearchClick(e) {
    if (!this.searchOpened) {
      this.renderer2.removeClass(this.searchCloseIconElementRef.nativeElement, 'hide');
      if (window.innerWidth < 700) {
        this.renderer2.addClass(this.searchBoxContainerElementRef.nativeElement, 'search-box-container-open-mobile');
      } else {
        this.renderer2.addClass(this.searchBoxContainerElementRef.nativeElement, 'search-box-container-open');
      }
      this.searchOpened = true;

    } else {
      //search code
      this.onSearchCloseClick(null);

    }
  }

  onSearchCloseClick(e) {
    if (this.searchOpened) {
      this.renderer2.addClass(this.searchCloseIconElementRef.nativeElement, 'hide');
      this.renderer2.removeClass(this.searchBoxContainerElementRef.nativeElement, 'search-box-container-open-mobile');
      this.renderer2.removeClass(this.searchBoxContainerElementRef.nativeElement, 'search-box-container-open');
    }
    this.searchOpened = false;
  }

  onNavSliderCloseClick(e) {
    e.preventDefault();
    this.NavSlideContainerRef.clear();
  }

  loadNavSlideElement() {
    this.NavSlideContainerRef.clear();
    this.NavSlideContainerRef.createEmbeddedView(this.NavSlideTemplateRef);
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    // this.loader.hideLoader();
    this.streamSubscription.unsubscribe();
  }
}
