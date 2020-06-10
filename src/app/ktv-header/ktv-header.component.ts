import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
@Component({
  selector: 'ktv-header',
  templateUrl: './ktv-header.component.html',
  styleUrls: ['./ktv-header.component.scss']
})

export class KridaTvHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private router:Router
  ) { }
  private streamSubscription: Subscription;

  ngOnInit() { 
    this.router.navigate(['/home'])
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    // this.loader.hideLoader();
    // this.streamSubscription.unsubscribe();
  }
}
