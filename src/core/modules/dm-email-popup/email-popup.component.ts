import { Renderer2 } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, OnDestroy, ViewContainerRef, TemplateRef, ElementRef } from '@angular/core';
import { DmDataModelManagerService } from 'dm-core';
import * as _ from 'lodash';
import { IEmailPopupConfig } from './email-popup.model';
import { InjectionContext } from 'dm-module-injector';
import { EmailPopupService } from './email-popup.service';
import { emailBrowserPopupConfig, emailDragAndDropConfig } from './dm-email-popup.config';
import { IMNotificationService } from '../../core';
import { LookupFrameworkSetter } from '../../common_module/lookup-framework/lookup.model';
import { DefaultLocalText } from './email-popup.enum';
import { IDmDragAndDropConfig } from '../dm-drag-and-drop/dm-drag-drop.model';
import { IDmPopupConfig } from 'dm-nextgen-popup';

@Component({
    selector: 'dm-email-popup',
    templateUrl: './email-popup.component.html',
    styleUrls: ['./email-popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DmEmailPopupComponent implements OnInit, OnDestroy {
    @Input('scope') scope;
    @Input('config') config: IEmailPopupConfig;
    @Input('dataModelStoreId') dataModelStoreId;

    @ViewChild('headerIcon', { static: false }) headerIcon: ElementRef<any>;
    @ViewChild('addAttachments', { static: false }) addAttachments: ElementRef<any>;
    @ViewChild('subjectInput', { static: false }) subjectInputRef: ElementRef<any>;
    @ViewChild('emailBodyContainer', { read: ViewContainerRef, static: true }) emailBodyContainerRef: ViewContainerRef;
    @ViewChild('emailBodyTemplate', { static: true }) emailBodyTemplateRef: TemplateRef<any>;
    @ViewChild('toEmailChipsContainer', { read: ViewContainerRef, static: true }) toEmailChipsContainerRef: ViewContainerRef;
    @ViewChild('toEmailChipsTemplate', { static: true }) toEmailChipsTemplateRef: TemplateRef<any>;
    @ViewChild('ccEmailChipsContainer', { read: ViewContainerRef, static: true }) ccEmailChipsContainerRef: ViewContainerRef;
    @ViewChild('ccEmailChipsTemplate', { static: true }) ccEmailChipsTemplateRef: TemplateRef<any>;
    @ViewChild('fileBrowsePopupContainer', { read: ViewContainerRef, static: true }) fileBrowsePopupContainerRef: ViewContainerRef;
    @ViewChild('fileBrowsePopupTemplate', { static: true }) fileBrowsePopupTemplateRef: TemplateRef<any>;
    @ViewChild('fromEmailContainer', { read: ViewContainerRef, static: true }) fromEmailContainerRef: ViewContainerRef;
    @ViewChild('fromEmailTemplate', { static: true }) fromEmailTemplateRef: TemplateRef<any>;
    @ViewChild('AttachmentListContainer', { read: ViewContainerRef, static: true }) AttachmentListContainerRef: ViewContainerRef;
    @ViewChild('AttachmentListTemplate', { static: true }) AttachmentListTemplateRef: TemplateRef<any>;
    @ViewChild('AttachmentBtnContainer', { read: ViewContainerRef, static: true }) AttachmentBtnContainerRef: ViewContainerRef;
    @ViewChild('AttachmentBtnTemplate', { static: true }) AttachmentBtnTemplateRef: TemplateRef<any>;
    constructor(
        private dmDataModelManagerService: DmDataModelManagerService,
        private renderer: Renderer2,
        private emailPopupService: EmailPopupService,
        private imNotificationService: IMNotificationService
    ) { }
    emailPopupModelData: any;
    subject: string = '';
    get defaultLocalText() { return DefaultLocalText; }

    ngOnInit() {
        this.emailPopupService.config = this.config;
        this.emailPopupService.scope = this.scope;
        this.emailPopupService.dataModelStoreId = this.dataModelStoreId;
        if (this.dataModelStoreId && this.dmDataModelManagerService.has(this.dataModelStoreId)) {
            this.emailPopupModelData = this.dmDataModelManagerService.getById(this.dataModelStoreId);
        }
        if (this.emailPopupModelData) {
            this.subject = _.get(this.emailPopupModelData, this.config.subject.data);
        }
        this.loadModules();
    }


    loadModules() {
        this.loadToChips('dm-nextgen-chips/chips', this.emailPopupService.getTOChipsConfig(this.emailPopupModelData, this.config));
        this.loadCcChips('dm-nextgen-chips/chips', this.emailPopupService.getCcChipsConfig(this.emailPopupModelData, this.config));
        if (this.config.body && this.config.body.modulePath) {
            this.loadBodyTemplateModule(this.config.body.modulePath, this.config.body.childConfig);
        }
        if (this.emailPopupModelData && this.config.header.fromData && this.emailPopupModelData[this.config.header.fromData]) {
            this.loadModule(this.fromEmailContainerRef, this.fromEmailTemplateRef, { email: this.emailPopupModelData[this.config.header.fromData] })
        }
        if (this.config.attachment) {
            this.loadAttachmentBtn();
            this.loadAttachmentList('dm-nextgen-chips/chips', this.emailPopupService.getAttachmentChipsConfig(this.emailPopupModelData, this.config));
        }
    }

    ngAfterViewInit() {
        if (this.config.subject.editable) {
            if (this.config.subject.maxLength) {
                this.renderer.setAttribute(this.subjectInputRef.nativeElement, "maxlength", "" + this.config.subject.maxLength);
            }
            this.renderer.setProperty(this.subjectInputRef.nativeElement, "disabled", false);
        }
    }

    toListContainerClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.emailPopupService.tolookupParams) {
            this.emailPopupService.tolookupParams[LookupFrameworkSetter.SetFocus]();
        }
        if (this.emailPopupService.cclookupParams) {
            this.emailPopupService.cclookupParams[LookupFrameworkSetter.SetOptions]([]);
            this.emailPopupService.cclookupParams[LookupFrameworkSetter.SetValue](this.emailPopupService.defaultLookupValue(this.config));
        }
    }

    ccListContainerClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.emailPopupService.cclookupParams) {
            this.emailPopupService.cclookupParams[LookupFrameworkSetter.SetFocus]();
        }
        if (this.emailPopupService.tolookupParams) {
            this.emailPopupService.tolookupParams[LookupFrameworkSetter.SetOptions]([]);
            this.emailPopupService.tolookupParams[LookupFrameworkSetter.SetValue](this.emailPopupService.defaultLookupValue(this.config));
        }
    }

    loadFileBrowseModule(path, config) {
        this.fileBrowsePopupContainerRef.clear();
        this.fileBrowsePopupContainerRef.createEmbeddedView(this.fileBrowsePopupTemplateRef, { manifestPath: path, config: { config, scope: this } });
    }

    afterFileSave(fileObj) {
        this.emailPopupService.addBrowsedFile(fileObj);
        this.fileBrowsePopupContainerRef.clear();
    }

    onFileBrowsePopupCloseClick() {
        this.fileBrowsePopupContainerRef.clear();
    }

    onAttachmentBtnClick(e) {
        let popupConfig: IDmPopupConfig = _.cloneDeep(emailBrowserPopupConfig);
        let fileUploadComppConfig: IDmDragAndDropConfig = _.cloneDeep(emailDragAndDropConfig);
        fileUploadComppConfig.saveUrl = this.config.attachment.saveUrl;
        popupConfig.childconfig = fileUploadComppConfig;
        this.loadFileBrowseModule('dmPopup/popupComponent', popupConfig);
    }

    onClose(e) {
        if (this.scope && this.config.header && this.config.header.onCloseClick) {
            this.scope[this.config.header.onCloseClick]();
        }
    }

    onFooterClose(e) {
        if (this.scope && this.config.events.onClose) {
            this.scope[this.config.events.onClose]();
        }
    }

    onSendBtnClick(e) {
        if (this.config.subject.editable && this.config.subject.required && !this.subject.length) {
            let message: string = (this.config.localeText && this.config.localeText.subjectRequiredMessage) ? this.config.localeText.subjectRequiredMessage : DefaultLocalText.SubjectRequired;
            this.imNotificationService.Notification('inform', message, "OK", "OK", () => { })
        } else if (this.scope && this.config.events.onSend) {
            let dataModelStoreId = this.emailPopupService.mapDataToSend(this.subject);
            if (dataModelStoreId) {
                this.scope[this.config.events.onSend](dataModelStoreId);
            }
        }
    }

    loadToChips(path: string, storeID: string) {
        this.toEmailChipsContainerRef.clear();
        this.toEmailChipsContainerRef.createEmbeddedView(this.toEmailChipsTemplateRef, { manifestPath: path, config: { storeID, scope: this.emailPopupService } });
    }

    loadCcChips(path: string, storeID: string) {
        this.ccEmailChipsContainerRef.clear();
        this.ccEmailChipsContainerRef.createEmbeddedView(this.ccEmailChipsTemplateRef, { manifestPath: path, config: { storeID, scope: this.emailPopupService } });
    }

    loadAttachmentBtn() {
        this.AttachmentBtnContainerRef.clear();
        this.AttachmentBtnContainerRef.createEmbeddedView(this.AttachmentBtnTemplateRef, {});
    }

    loadAttachmentList(path: string, storeID: string) {
        this.AttachmentListContainerRef.clear();
        this.AttachmentListContainerRef.createEmbeddedView(this.AttachmentListTemplateRef, { manifestPath: path, config: { storeID, scope: this.emailPopupService } });
    }

    loadBodyTemplateModule(path: string, childConfig: any) {
        this.emailBodyContainerRef.clear();
        this.emailBodyContainerRef.createEmbeddedView(this.emailBodyTemplateRef, { manifestPath: path, childConfig });
    }

    loadModule(containerRef: ViewContainerRef, templateRef: TemplateRef<any>, values: object) {
        containerRef.clear();
        containerRef.createEmbeddedView(templateRef, values);
    }

    onSubjectChange(event) {
        this.subject = event.target.value;
    }

    ngOnDestroy() {
        if (this.dmDataModelManagerService.has(this.dataModelStoreId)) {
            this.dmDataModelManagerService.deregisterDataModel(this.dataModelStoreId);
        }
        this.dmDataModelManagerService.deregisterDataModel(this.emailPopupService.attachmentListChipsConfigStoreId);
        this.dmDataModelManagerService.deregisterDataModel(this.emailPopupService.taDashbardEmailPopupCcChipsConfigModelId);
        this.dmDataModelManagerService.deregisterDataModel(this.emailPopupService.taDashbardEmailPopupToChipsConfigModelId);
    }

    outletConfig: any;
    onInitialize(_outletConfig) {
        this.outletConfig = _outletConfig;
    }
    onDeinitialize(outletConfig) { }

    onActivate(context: InjectionContext) {
    }

}
