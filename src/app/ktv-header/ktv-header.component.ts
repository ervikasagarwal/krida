import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewContainerRef, TemplateRef, Renderer2, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import { MediaMatcher, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
@Component({
  selector: 'ktv-header',
  templateUrl: './ktv-header.component.html',
  styleUrls: ['./ktv-header.component.scss']
})

export class KridaTvHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private renderer2: Renderer2,
    public mediaMatcher: MediaMatcher
  ) { }
  @ViewChild('NavSlideContainer', { read: ViewContainerRef, static: true }) NavSlideContainerRef: ViewContainerRef;
  @ViewChild('NavSlideTemplate', { static: true }) NavSlideTemplateRef: TemplateRef<any>;
  @ViewChild('searchBoxContainer', { static: true }) searchBoxContainerElementRef: ElementRef<any>;
  @ViewChild('searchCloseIcon', { static: true }) searchCloseIconElementRef: ElementRef<any>;

  private streamSubscription: Subscription;

  ngOnInit() {
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
  }

  onMenuBtnClick(e) {
    e.preventDefault();
    this.loadNavSlideElement();
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
