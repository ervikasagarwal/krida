import { InjectionContext } from 'dm-module-injector';
import { UserLookupService } from './user-lookup.service';
import { DmDataModelManagerService } from 'dm-core';
import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ViewContainerRef, TemplateRef, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import * as _ from 'lodash';
import { IUserLookupPopupConfig, UserLookupSetter } from "./user-lookup.model";
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'user-lookup-popup',
    templateUrl: './user-lookup.component.html',
    styleUrls: ['./user-lookup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserLookupPopupComponent implements OnInit, OnDestroy {
    @Input('config') config: IUserLookupPopupConfig;
    @Input('scope') scope: any;
    @ViewChild('CancelBtnContainer', { read: ViewContainerRef, static: true }) CancelBtnContainerRef: ViewContainerRef;
    @ViewChild('CancelBtnTemplate', { static: true }) CancelBtnTemplateRef: TemplateRef<any>;
    @ViewChild('SubmitBtnContainer', { read: ViewContainerRef, static: true }) SubmitBtnContainerRef: ViewContainerRef;
    @ViewChild('SubmitBtnTemplate', { static: true }) SubmitBtnTemplateRef: TemplateRef<any>;
    @ViewChild('userSelectionContainer', { read: ViewContainerRef, static: true }) userSelectionContainerRef: ViewContainerRef;
    @ViewChild('userSelectionTemplate', { static: true }) userSelectionTemplateRef: TemplateRef<any>;
    @ViewChild('ConfirmationBodyContainer', { read: ViewContainerRef, static: true }) confirmationBodyContainerRef: ViewContainerRef;
    @ViewChild('ConfirmationBodyTemplate', { static: true }) confirmationBodyTemplateRef: TemplateRef<any>;
    @ViewChild('ConfirmBtnContainer', { read: ViewContainerRef, static: true }) ConfirmBtnContainerRef: ViewContainerRef;
    @ViewChild('ConfirmBtnTemplate', { static: true }) ConfirmBtnTemplateRef: TemplateRef<any>;

    users: any[];
    formControl = new FormControl();
    private streamSubscription: Subscription = new Subscription();
    searchText: string = '';
    placeholder: string;
    inputLabel: string;
    popupTitle: string;
    confirmMessage: string;
    confirmPopupTitle: string = ''
    selectedUser: any;
    key: string;
    value: string;

    constructor(
        private dataModelsService: DmDataModelManagerService,
        private userLookupService: UserLookupService,
        private translate: TranslateService,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.setLocaleText();
        this.userLookupService.config = this.config;
        this.userLookupService.scope = this.scope;
        this.bindSetterFunctions();
        this.value = this.config.model.value;
        this.key = this.config.model.key;
        this.selectedUser = this.userLookupService.getDefaultUserDetailObj();
        this.loadLookupActionButtons();
        this.loadUserSelectionModule();
        this.users = this.config.options;
        this.streamSubscription.add(this.formControl.valueChanges.subscribe(data => {
            if (typeof data === 'string') {
                this.onKeyUp(data);
            }
        }));
    }

    bindSetterFunctions() {
        this.config[UserLookupSetter.SetOptions] = this.setOptions;
        this.config[UserLookupSetter.SetConfirmationMessage] = this.setConfirmationMessage;
    }

    setConfirmationMessage = (message: string) => {
        this.confirmMessage = this.config.confirmationMessage = message;
    }

    setOptions = (optionsList: any[]) => {
        this.users = _.cloneDeep(optionsList);
        this.config.options = _.cloneDeep(optionsList);
        this.changeDetectorRef.detectChanges();
    }

    setLocaleText() {
        if (!this.config.localeText) this.config.localeText = {};
        this.popupTitle = this.translate.instant(this.config.localeText.popupTitle || this.userLookupService.defaultLocalText.popupTitle);
        this.inputLabel = this.translate.instant(this.config.localeText.searchInputLabel || this.userLookupService.defaultLocalText.searchInputLabel);
        this.placeholder = this.translate.instant(this.config.localeText.searchInputPlaceholder || this.userLookupService.defaultLocalText.searchInputPlaceholder);
        this.confirmMessage = this.translate.instant(this.config.confirmationMessage || this.userLookupService.defaultLocalText.confirmationMessage);
        this.confirmPopupTitle = this.translate.instant(this.config.localeText.confirmationTitle || this.userLookupService.defaultLocalText.confirmationTitle);
        if (this.config.localeText.submit) {
            this.userLookupService.submitBtnConfig.title = this.config.localeText.submit;
        }
        if (this.config.localeText.cancel) {
            this.userLookupService.cancelBtnConfig.title = this.config.localeText.cancel;
        }
        if (this.config.localeText.confirm) {
            this.userLookupService.confirmBtnConfig.title = this.config.localeText.confirm;
        }
    }

    loadLookupActionButtons() {
        this.dataModelsService.registerDataModel(this.userLookupService.submitBtnConfigStoreId, { buttonConfig: this.userLookupService.submitBtnConfig, callback: 'onFooterSubmitClick' }, true);
        this.loadModule(this.SubmitBtnContainerRef, this.SubmitBtnTemplateRef, 'dm-btn-wrapper/btn', { configStoreId: this.userLookupService.submitBtnConfigStoreId, scope: this });
        this.dataModelsService.registerDataModel(this.userLookupService.cancelBtnConfigStoreId, { buttonConfig: this.userLookupService.cancelBtnConfig, callback: 'onFooterCancel' }, true);
        this.loadModule(this.CancelBtnContainerRef, this.CancelBtnTemplateRef, 'dm-btn-wrapper/btn', { configStoreId: this.userLookupService.cancelBtnConfigStoreId, scope: this });
    }

    loadConfirmationActionButtons() {
        this.dataModelsService.registerDataModel(this.userLookupService.confirmBtnConfigStoreId, { buttonConfig: this.userLookupService.confirmBtnConfig, callback: 'onFooterConfirmClick' }, true);
        this.loadModule(this.ConfirmBtnContainerRef, this.ConfirmBtnTemplateRef, 'dm-btn-wrapper/btn', { configStoreId: this.userLookupService.confirmBtnConfigStoreId, scope: this });
    }

    loadUserSelectionModule() {
        this.loadModule(this.userSelectionContainerRef, this.userSelectionTemplateRef, null, {});
    }

    loadConfirmationBody() {
        this.loadModule(this.confirmationBodyContainerRef, this.confirmationBodyTemplateRef, null, {});
    }

    onUserSelect(selectedUser) {
        this.selectedUser = _.cloneDeep(selectedUser);
        this.config['selectedUser'] = _.cloneDeep(selectedUser);
        this.dataModelsService.setIn(this.userLookupService.submitBtnConfigStoreId, ['buttonConfig', 'disable'], false);
    }

    trackByFn: Function = (index, item) => {
        if (this.config.model.key && item[this.config.model.key]) {
            return item[this.config.model.key];
        } else if (this.config.model.value && item[this.config.model.value]) {
            return item[this.config.model.value];
        }
        return index;
    }

    onFooterCancel(e) {
        if (this.scope && this.config.events.onCancel) {
            this.scope[this.config.events.onCancel](this.config);
        }
    }

    onFooterSubmitClick(e) {
        if (this.scope && this.config.events.onSubmit) {
            this.scope[this.config.events.onSubmit](this.config);
        }
        if (this.config.confirmRequired) {
            this.SubmitBtnContainerRef.clear();
            this.userSelectionContainerRef.clear();
            this.loadConfirmationBody();
            this.confirmMessage = this.confirmMessage.replace(':userName', this.selectedUser.name);
            this.loadConfirmationActionButtons();
            this.popupTitle = this.confirmPopupTitle;
        }
    }

    onFooterConfirmClick(e) {
        if (this.scope && this.config.events.onConfirm) {
            this.scope[this.config.events.onConfirm](this.config);
        }
    }

    onKeyUp(searchText) {
        this.selectedUser = this.userLookupService.getDefaultUserDetailObj();
        this.dataModelsService.setIn(this.userLookupService.submitBtnConfigStoreId, ['buttonConfig', 'disable'], true);
        if (this.config.events.onKeyup && this.scope) {
            this.scope[this.config.events.onKeyup](searchText, this.config);
        }
    }

    onOverlayClick($event) {
        if (this.config.events.onOverlayClick && this.scope) {
            this.scope[this.config.events.onOverlayClick](this.config);
        }
    }

    onCloseIconClicked(e) {
        if (this.config.events.onClose && this.scope) {
            this.scope[this.config.events.onClose](this.config);
        }
    }

    loadModule(containerRef: ViewContainerRef, templateRef: TemplateRef<any>, manifestPath: string, config: any) {
        containerRef.clear();
        containerRef.createEmbeddedView(templateRef, { manifestPath, config });
    }

    ngOnDestroy() {
        this.dataModelsService.deregisterDataModel(this.userLookupService.cancelBtnConfigStoreId);
        this.dataModelsService.deregisterDataModel(this.userLookupService.submitBtnConfigStoreId);
        this.dataModelsService.deregisterDataModel(this.userLookupService.confirmBtnConfigStoreId);
        this.streamSubscription.unsubscribe();
    }

    outletConfig: any;
    onInitialize(_outletConfig) {
        this.outletConfig = _outletConfig;
    }

    onDeinitialize(outletConfig) { }
    onActivate(context: InjectionContext) { }
}
