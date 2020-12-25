import { LookupFrameworkSetter, ILookupConfig, FieldTypes } from './im-common-grid-lookup.model';
import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit, OnDestroy, ViewChild, ViewContainerRef, TemplateRef, ElementRef, ChangeDetectorRef, Renderer2 } from '@angular/core';
import * as _ from 'lodash';
@Component({
	selector: 'im-common-grid-lookup-framework-component',
	templateUrl: './im-common-grid-lookup-framework.component.html',
	styleUrls: ['./im-common-grid-lookup-framework.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImCommonGridLookupFrameworkComponent implements OnInit, AfterViewInit, OnDestroy {
	public params: ILookupConfig;
	public suggestionList = [];
	unsubscribeChannel;
	private autoCompleteKeyUpValue;
	textboxValue;
	scope;
	config;
	@ViewChild('suggestionListContainer', { static: false, read: ViewContainerRef }) _suggestionListContainer: ViewContainerRef;
	@ViewChild('suggestionListTemplate', { static: false }) _suggestionListTemplate: TemplateRef<any>;
	@ViewChild('textboxContainer', { static: false, read: ViewContainerRef }) textboxContainer: ViewContainerRef;
	@ViewChild('textboxTemplate', { static: false }) textboxTemplate: TemplateRef<any>;
	@ViewChild('optionsListFooterContainer', { static: false, read: ViewContainerRef }) optionsListFooterContainer: ViewContainerRef;
	@ViewChild('optionsListFooterTemplate', { static: false }) optionsListFooterTemplate: TemplateRef<any>;
	@ViewChild('inputElementRef', { static: true }) inputElementRefRef: ElementRef<any>;
	@ViewChild('DisabledLabelContainer', { read: ViewContainerRef, static: true }) DisabledLabelContainerRef: ViewContainerRef;
	@ViewChild('DisabledLabelTemplate', { static: true }) DisabledLabelTemplateRef: TemplateRef<any>;
	constructor(private changeDetectorRef: ChangeDetectorRef,
		private elementRef: ElementRef,
		private renderer: Renderer2,
	) { }
	inputElement;

	ngOnInit() {
		if (this.config) this.params = this.config;
		if (this.scope) this.params['gridService'] = this.scope;
		if (this.config) {
			this.agInit(this.params);
		};
	}

	ngAfterViewInit() {
		this.renderTextbox();
		this.inputElement = this.elementRef.nativeElement.querySelector('input');
		if (this.params.type == FieldTypes.Dropdown) {
			this.renderer.setAttribute(this.inputElement, 'readonly', 'true');
		}
		this.onComponentInitCallback();
		this._suggestionListContainer.clear();
		if (!this.changeDetectorRef['destroyed']) {
			this.changeDetectorRef.detectChanges();
		}
	}

	agInit(params: any): void {
		this.params = params;
		if (this.params.type == FieldTypes.Text) {
			this.loadDisabledText(this.params.value[this.params.model[this.params.displayFormat]]);
			return;
		}
		if (this.params && this.params.value) {
			if (this.params.displayFormat) {
				this.textboxValue = this.params.value[this.params.model[this.params.displayFormat]];
			}
		}
		if (this.params.options) {
			this.suggestionList = this.params.options;
		}
		this.mapEvents();
	}

	loadDisabledText(value: string) {
		this.DisabledLabelContainerRef.clear();
		this.textboxContainer.clear();
		this._suggestionListContainer.clear();
		this.DisabledLabelContainerRef.createEmbeddedView(this.DisabledLabelTemplateRef, { value });
	}

	mapEvents() {
		if (!this.params[LookupFrameworkSetter.SetOptions]) {
			this.params[LookupFrameworkSetter.SetOptions] = this.setOptions;
			this.params[LookupFrameworkSetter.SetValue] = this.setSelectedValue;
			this.params[LookupFrameworkSetter.SetInvalid] = this.setInvalid;
			this.params[LookupFrameworkSetter.RenderValueAsAText] = this.renderValueAsAText;
			this.params[LookupFrameworkSetter.SetFocus] = this.setFocus;
		}
	}

	setFocus: Function = () => {
		if (this.inputElement) {
			this.inputElement.focus();
		}
	}

	renderValueAsAText = () => {
		this.loadDisabledText(this.params.value[this.params.model[this.params.displayFormat]]);
	}

	onComponentInitCallback() {
		if (this.params.gridService && this.params.events && this.params.events.onComponentInit) {
			this.params.gridService[this.params.events.onComponentInit](this.params);
		}
	}

	refresh(): boolean {
		this.params.disabled = true;
		return false;
	}

	renderSuggestionList() {
		if (!this._suggestionListContainer) return;
		if ((this.params.type == FieldTypes.Dropdown || this.params.type == FieldTypes.Autocomplete) && this.suggestionList.length > 0) {
			this._suggestionListContainer.clear();
			this._suggestionListContainer.createEmbeddedView(this._suggestionListTemplate);
		} else {
			this._suggestionListContainer.clear();
		}
	}

	renderTextbox() {
		if (this.params.type == FieldTypes.Dropdown || this.params.type == FieldTypes.Autocomplete) {
			this.textboxContainer.clear();
			this.textboxContainer.createEmbeddedView(this.textboxTemplate);
		}
	}

	trackByFn: Function = (index, item) => {
		return item[this.params.model.key];
	}
	onKeyUp = _.debounce(this.continueOnKeyUp, 500);

	continueOnKeyUp(event) {
		this.textboxValue = event.target.value;
		if (this.params.type == FieldTypes.Autocomplete && this.params.gridService && this.params.events.onKeyUp) {
			this.autoCompleteKeyUpValue = event.target.value;
			this.params.gridService[this.params.events.onKeyUp](event.target.value, this.params);
		}

	}

	onKeyDown(e) {
		e.stopPropagation();
	}

	onTextBoxClick() {
		this.renderSuggestionList();
	}

	onBlur() {
		_.delay(() => {
			if (this.params.value && this.params.model && this.params.displayFormat) {
				this.textboxValue = this.params.value[this.params.model[this.params.displayFormat]];
			}
			if (!this.changeDetectorRef['destroyed']) {
				this.changeDetectorRef.detectChanges();
			}
			this._suggestionListContainer.clear();
		}, 500);
	}

	setOptions: Function = (options: Array<any>) => {
		this.suggestionList = options;
		this.renderSuggestionList();
		if (!this.changeDetectorRef['destroyed']) {
			this.changeDetectorRef.detectChanges();
		}
	}

	setSelectedValue = (value) => {
		this.params.value = value;
		if (this.params.displayFormat) {
			let fieldData = value;
			this.textboxValue = fieldData[this.params.model[this.params.displayFormat]];
		} else {
			this.textboxValue = this.params.value.value;
		}
	}

	setInvalid = (invalid) => {
		if (invalid) {
			this.params.invalid = true;
		} else {
			this.params.invalid = false;
		}
	}

	onViewMore() {
		this.params.gridService[this.params.events.onViewMore](this.autoCompleteKeyUpValue, this.params);
	}

	onClear() {
		this.params.gridService[this.params.events.onClear](this.params);
	}

	onSelectSuggestionItem(item) {
		this.setSelectedValue(item);
		this._suggestionListContainer.clear();
		if (this.params.gridService && this.params.events.onSelect) {
			this.params.gridService[this.params.events.onSelect](item, this.params);
		}
		if (!this.changeDetectorRef['destroyed']) {
			this.changeDetectorRef.detectChanges();
		}
	}

	onDeinitialize(outletConfig) { }
	ngOnDestroy() { }
}
