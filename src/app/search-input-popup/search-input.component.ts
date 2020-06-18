import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
@Component({
  selector: 'search-input-popup',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})

export class SearchInputPopupComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private router: Router
  ) { }
  @ViewChild('NavSlideContainer', { read: ViewContainerRef, static: true }) NavSlideContainerRef: ViewContainerRef;
  @ViewChild('NavSlideTemplate', { static: true }) NavSlideTemplateRef: TemplateRef<any>;
  private streamSubscription: Subscription;

  ngOnInit() { }

  ngAfterViewInit() { }

  ngOnDestroy() {
    // this.loader.hideLoader();
    // this.streamSubscription.unsubscribe();
  }
}
