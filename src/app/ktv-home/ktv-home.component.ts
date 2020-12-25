import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
@Component({
  selector: 'ktv-home',
  templateUrl: './ktv-home.component.html',
  styleUrls: ['./ktv-home.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ktvHomeComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor() { }

  ngOnInit() { }
  ngAfterViewInit() { }
  ngOnDestroy() { }
}
