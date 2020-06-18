import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewContainerRef, TemplateRef, Renderer2, ElementRef } from '@angular/core';
import * as _ from 'lodash';
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
    private renderer2: Renderer2
  ) { }
  @ViewChild('NavSlideContainer', { read: ViewContainerRef, static: true }) NavSlideContainerRef: ViewContainerRef;
  @ViewChild('NavSlideTemplate', { static: true }) NavSlideTemplateRef: TemplateRef<any>;
  @ViewChild('searchBoxContainer', { static: true }) searchBoxContainerElementRef: ElementRef<any>;
  private streamSubscription: Subscription;

  ngOnInit() {
  }

  onMenuBtnClick(e) {
    e.preventDefault();
    this.loadNavSlideElement();
  }

  onSearchClick(e) { }

  onSearchMouseOver(e) {
    console.log(window.innerWidth);
    if (window.innerWidth < 700) {
      this.renderer2.addClass(this.searchBoxContainerElementRef.nativeElement, 'search-box-container-hover-mobile');
    }
    // this.renderer2.removeClass(this.searchBoxContainerElementRef.nativeElement, 'search-box-container:hover');
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
    // this.streamSubscription.unsubscribe();
  }
}
