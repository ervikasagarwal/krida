import { Router } from '@angular/router';
import { Component, ElementRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
declare var icons: any;
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
	title = 'testProject';
	constructor(
		private elementRef: ElementRef
	) {
		
	}
	ngAfterViewInit() {
		if (typeof icons != 'undefined') {
			this.elementRef.nativeElement.querySelector('.main-container').insertAdjacentHTML('beforeend', icons);
		}
	}
}


