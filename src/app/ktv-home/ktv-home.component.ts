import { RouterModule, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
@Component({
  selector: 'ktv-home',
  templateUrl: './ktv-home.component.html',
  styleUrls: ['./ktv-home.component.scss']
})
export class ktvHomeComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    ) { }
  private streamSubscription: Subscription;

  ngOnInit() {
    alert('hi');
  }
  ngAfterViewInit() { }
  ngOnDestroy() { }
}
