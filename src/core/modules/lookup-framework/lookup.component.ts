import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Renderer2, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewContainerRef, TemplateRef, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import * as _ from 'lodash';
import { FieldTypes, DisplayFormats, ILookupConfig } from "./lookup.model";

@Component({
    selector: 'lookup-framework-component',
    templateUrl: './lookup.component.html',
    styleUrls: ['./lookup.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgGridLookupFrameworkComponent implements OnInit, AfterViewInit {
    @Input('params') params: ILookupConfig;
    @Input('scope') scope: any;
    options: any[];
    formControl = new FormControl();
    uniqueLineId;
    date
    private streamSubscription: Subscription = new Subscription();

    @ViewChild('lookupAutoCompleteInput', { static: true }) lookupAutoCompleteInput: ElementRef<any>;
    @ViewChild('taAutocompleteField', { static: true }) taAutocompleteFieldRef: ElementRef<any>;
    @ViewChild('AutoCompleteContainer', { read: ViewContainerRef, static: true }) AutoCompleteContainerRef: ViewContainerRef;
    @ViewChild('AccountLookupTemplate', { static: true }) AccountLookupTemplateRef: TemplateRef<any>;
    @ViewChild('DisabledLabelContainer', { read: ViewContainerRef, static: true }) DisabledLabelContainerRef: ViewContainerRef;
    @ViewChild('DisabledLabelTemplate', { static: true }) DisabledLabelTemplateRef: TemplateRef<any>;
    @ViewChild('SelectContainer', { read: ViewContainerRef, static: true }) SelectContainerRef: ViewContainerRef;
    @ViewChild('SelectTemplate', { static: true }) SelectTemplateRef: TemplateRef<any>;
    @ViewChild('DateContainer', { read: ViewContainerRef, static: true }) DateContainerRef: ViewContainerRef;
    @ViewChild('DateTemplate', { static: true }) DateTemplateRef: TemplateRef<any>;
    optionContainer
    previousValue;
    agInit(params: any): void {
        this.params = params;
        this.mapEvents();
    }
    constructor(
        public renderer2: Renderer2,
        private elementRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    selectedValue;
    ngOnInit() {
        this.mapEvents()
        this.loadComponent();
        if (this.scope) this.params.scope = this.scope;
        if (this.params.options) {
            this.options = this.params.options;
        }
        this.setInitialCss();
        this.onComponentInitCallback();
    }

    loadComponent() {
        if (this.params.type == FieldTypes.Text) {
            this.loadDisabledText(this.params.value[this.params.model.value]);
            this.AutoCompleteContainerRef.clear();
            this.SelectContainerRef.clear();
            return;
        } else if (this.params.type == FieldTypes.Autocomplete) {
            this.loadAutocompleteComponent();
            this.DisabledLabelContainerRef.clear();
            this.SelectContainerRef.clear();
            if (this.params.value && typeof this.params.value == 'object') {
                this.previousValue = _.cloneDeep(this.params.value);
                this.formControl.setValue(_.cloneDeep(this.params.value));
            } else {
                this.previousValue = { [this.params.model.key]: this.params.value, [this.params.model.value]: this.params.value };
                this.formControl.setValue(_.cloneDeep(this.previousValue));
            }
            this.streamSubscription.add(this.formControl.valueChanges.subscribe(data => {
                if (typeof data === 'string') {
                    this.onKeyUp(data);
                    this.detectChanges();
                }
            }));
        } else if (this.params.type == FieldTypes.Select) {
            if (this.params.value) this.selectedValue = this.params.value[this.params.model.key] || {};
            this.loadSelectComponent();
            this.DisabledLabelContainerRef.clear();
            this.AutoCompleteContainerRef.clear();
        } else if (this.params.type == FieldTypes.Date) {
            if (this.params.value) this.date = this.params.value || ''
            this.loadDateComponent();
            this.DisabledLabelContainerRef.clear();
            this.AutoCompleteContainerRef.clear();
        }
    }

    onAutoCompleteSelectOption(e, selectedOption) {
        if (e.isUserInput) {
            console.log(selectedOption, e.isUserInput);
            if (this.previousValue && this.previousValue[this.params.model.key] == selectedOption[this.params.model.key]) return;
            this.formControl.setValue(_.cloneDeep(selectedOption));
            this.previousValue = _.cloneDeep(selectedOption);
            if (this.params.scope && this.params.events.onSelect) {
                this.params.scope[this.params.events.onSelect](_.cloneDeep(selectedOption), this.params);
            }
        }
    }

    keyDown(e) {
        e.stopPropagation();
    }

    onKeyUp = _.debounce(this.continueOnKeyUp, 500);

    continueOnKeyUp(data) {
        if (this.params.scope && this.params.events.onKeyUp) {
            this.params.scope[this.params.events.onKeyUp](data, this.params);
        }
    }

    mapEvents() {
        if (!this.params['setOptions']) {
            this.params['setOptions'] = this.setOptions;
            this.params['setInvalid'] = this.setInvalid;
            this.params['setAbility'] = this.setAbility;
            this.params['setValue'] = this.setValue;
            this.params['setFocus'] = this.setFocus;
        }
    }


    agInitCallback() {
        if (this.params.scope && this.params.events.onAgInit) {
            this.params.scope[this.params.events.onAgInit](this.params);
        }
    }

    onComponentInitCallback() {
        if (this.params.scope && this.params.events.onComponentInit) {
            this.params.scope[this.params.events.onComponentInit](this.params);
        }
    }

    setOptions: Function = (options: Array<any>) => {
        this.options = this.params['options'] = options;
        this.detectChanges();
    }

    setValue: Function = (value) => {
        if (this.params.type == FieldTypes.Select) {
            this.previousValue = value[this.params.model.key];
            this.selectedValue = value[this.params.model.key];
        } else if (this.params.type == FieldTypes.Autocomplete) {
            this.previousValue = _.cloneDeep(value);
            this.formControl.setValue(_.cloneDeep(value));
        } else if (this.params.type == FieldTypes.Date) {
            this.date = value;
        }
        this.detectChanges();
    }

    setInvalid: Function = (invalid: boolean) => {
        this.params['invalid'] = invalid;
        if (this.params.invalid) {
            this.renderer2.addClass(this.formFieldWrapperElement, 'invalid-Error-textbox');
        } else {
            this.renderer2.removeClass(this.formFieldWrapperElement, 'invalid-Error-textbox');
        }
    }

    setAbility: Function = (disabled: boolean) => {
        this.params['disabled'] = disabled;
        if (this.params.disabled) {
            this.formControl.disable()
            this.renderer2.addClass(this.formFieldWrapperElement, 'ta-input-disabled');
        } else {
            this.formControl.enable();
            this.renderer2.removeClass(this.formFieldWrapperElement, 'ta-input-disabled');
        }
    }

    onBlur(e) {
        e.preventDefault();
        this.setValue(this.previousValue);
    }

    setInitialCss() {
        this.formFieldWrapperElement = this.elementRef.nativeElement.querySelector('.im-lookup-framework-mat-form-wrapper');
        if (this.params.type == FieldTypes.Autocomplete) {
            this.formFieldWrapperElement = this.elementRef.nativeElement.querySelector('.im-lookup-framework-mat-form-wrapper>.mat-form-field-wrapper');
        }
        if (!this.formFieldWrapperElement) return;
        if (this.params.invalid) {
            this.renderer2.addClass(this.formFieldWrapperElement, 'invalid-Error-textbox');
        } else {
            this.renderer2.removeClass(this.formFieldWrapperElement, 'invalid-Error-textbox');
        }
        if (this.params.disabled) {
            this.formControl.disable()
            this.renderer2.addClass(this.formFieldWrapperElement, 'ta-input-disabled');
        } else {
            this.formControl.enable();
            this.renderer2.removeClass(this.formFieldWrapperElement, 'ta-input-disabled');
        }
    }

    formFieldWrapperElement;
    inputElement;

    ngAfterViewInit() {
        this.inputElement = this.elementRef.nativeElement.querySelector('input');
    }
    
    setFocus: Function = () => {
        if (this.inputElement) {
            this.inputElement.focus();
        }
    }

    displayValue: Function = (subject) => {
        if (subject) {
            let displayFormat = this.params.displayFormat || DisplayFormats.Value;
            return subject[this.params.model[displayFormat]];
        }
    }

    loadAutocompleteComponent() {
        this.AutoCompleteContainerRef.clear();
        this.AutoCompleteContainerRef.createEmbeddedView(this.AccountLookupTemplateRef);
    }

    loadSelectComponent() {
        this.SelectContainerRef.clear();
        this.SelectContainerRef.createEmbeddedView(this.SelectTemplateRef);
    }

    loadDateComponent() {
        this.DateContainerRef.clear();
        this.DateContainerRef.createEmbeddedView(this.DateTemplateRef);
    }

    loadDisabledText(value: string) {
        this.DisabledLabelContainerRef.clear();
        this.DisabledLabelContainerRef.createEmbeddedView(this.DisabledLabelTemplateRef, { value });
    }

    ngOnDestroy() {
        this.streamSubscription.unsubscribe();
    }

    trackByFn: Function = (index, item) => {
        if (this.params.model.key && item[this.params.model.key]) {
            return item[this.params.model.key];
        }
        return index;
    }

    detectChanges() {
        if (!this.changeDetectorRef['destroyed']) {
            this.changeDetectorRef.detectChanges();
        }
    }

    selectionChange(event) {
        let selectedOption = this.options.find((option) => {
            return option[this.params.model.key] == event.value;
        });
        if (this.params.scope && this.params.events.onSelect) {
            this.params.scope[this.params.events.onSelect](_.cloneDeep(selectedOption), this.params);
        }
    }

    dateSelectionChange(event) {
        if (this.params.scope && this.params.events.onSelect) {
            this.params.scope[this.params.events.onSelect](_.cloneDeep(event.value), this.params);
        }
    }

    onViewMore() {
        if (this.params.scope && this.params.events.onViewMore) {
            this.params.scope[this.params.events.onViewMore](this.params);
        }
    }

    onClear() {
        if (this.params.scope && this.params.events.onSelect) {
            this.params.scope[this.params.events.onSelect](this.params);
        }
    }
}
