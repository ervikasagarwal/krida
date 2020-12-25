import { Injectable } from "@angular/core";
import * as _ from 'lodash';
import { toEmailLookupConfig, emailReceiverChipsConfig, attachmentListChipsConfig } from "./dm-email-popup.config";
import { IChipHost } from "../dm-nextgen-chips/dm-chip-host.interface";
import { DmDataModelManagerService } from "dm-core";
// import { IEmailPopupModelData } from "../../interfaces/dashboard/email-popup.model";
import { IEmailPopupConfig } from "./email-popup.model";
import { ILookupConfig, LookupFrameworkSetter } from "../lookup-framework/lookup.model";
import { LookupModelKey, ReceiverInput, ChipRemoveCallBackFunName, LookupOnSelectFunName, LookupInitCallBackFunName, LookupKeyUpFunName, DefaultLocalText, MessagePlaceHolder } from "./email-popup.enum";
import { IMNotificationService } from "../../core";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class EmailPopupService {

    constructor(
        private dmDataModelManagerService: DmDataModelManagerService,
        private imNotificationService: IMNotificationService,
        private translate: TranslateService,
    ) { }
    config: IEmailPopupConfig;
    scope: any;
    dataModelStoreId: string;

    taDashbardEmailPopupToChipsConfigModelId: string = 'taDashbardEmailPopupToChipsConfigModelId';
    taDashbardEmailPopupCcChipsConfigModelId: string = 'taDashbardEmailPopupCcChipsConfigModelId';
    attachmentListChipsConfigStoreId: string = 'taDashbardEmailPopupattachmentListChipsConfigStoreId';

    getLookupConfig(emailPopupConfig: IEmailPopupConfig, receiverInputType: ReceiverInput) {
        let config: ILookupConfig = _.cloneDeep(toEmailLookupConfig);
        config.model = {
            key: emailPopupConfig.receiver.data.model.identifyBy,
            value: emailPopupConfig.receiver.data.model.displayBy
        };
        config.events.onSelect = LookupOnSelectFunName[receiverInputType];
        config.events.onKeyUp = LookupKeyUpFunName[receiverInputType];
        config.events.onComponentInit = LookupInitCallBackFunName[receiverInputType];
        config.optionsFormat = LookupModelKey[emailPopupConfig.receiver.optionsFormat];
        config.displayFormat = LookupModelKey[emailPopupConfig.receiver.displayFormat];
        config.value = this.defaultLookupValue(emailPopupConfig);
        return config;
    }

    getChipsConfig(emailPopupModelData, emailPopupConfig: IEmailPopupConfig, receiverInputType: ReceiverInput): IChipHost {
        let config: IChipHost = _.cloneDeep(emailReceiverChipsConfig);
        config.chipDetails.displayBy = emailPopupConfig.receiver.data.model.displayBy;
        config.chipDetails.identifyBy = emailPopupConfig.receiver.data.model.identifyBy;
        config.chipDetails.events.remove = this[ChipRemoveCallBackFunName[receiverInputType]];
        config.postModule = {
            path: 'ta-email-lookup/lookup',
            childConfig: { params: this.getLookupConfig(emailPopupConfig, receiverInputType) }
        }
        return config;
    }

    getTOChipsConfig(emailPopupModelData, emailPopupConfig: IEmailPopupConfig): string {
        let config: IChipHost = this.getChipsConfig(emailPopupModelData, emailPopupConfig, ReceiverInput.To);
        config.model = _.cloneDeep(_.get(emailPopupModelData, emailPopupConfig.receiver.data.toArray));
        let toChipsModelId = this.taDashbardEmailPopupToChipsConfigModelId;
        this.dmDataModelManagerService.registerDataModel(toChipsModelId, { config }, true);
        return toChipsModelId;
    }

    getCcChipsConfig(emailPopupModelData, emailPopupConfig: IEmailPopupConfig): string {
        let config: IChipHost = this.getChipsConfig(emailPopupModelData, emailPopupConfig, ReceiverInput.CC);
        config.model = _.cloneDeep(_.get(emailPopupModelData, emailPopupConfig.receiver.data.ccArray));
        let ccChipsModelId = this.taDashbardEmailPopupCcChipsConfigModelId;
        this.dmDataModelManagerService.registerDataModel(ccChipsModelId, { config }, true);
        return ccChipsModelId;
    }

    getAttachmentChipsConfig(emailPopupModelData, emailPopupConfig: IEmailPopupConfig): string {
        let config: IChipHost = _.cloneDeep(attachmentListChipsConfig);
        config.chipDetails.displayBy = emailPopupConfig.attachment.model.displayBy;
        config.chipDetails.identifyBy = emailPopupConfig.attachment.model.identifyBy;
        config.model = _.cloneDeep(_.get(emailPopupModelData, emailPopupConfig.attachment.data));
        let configStoreId = this.attachmentListChipsConfigStoreId;
        this.dmDataModelManagerService.registerDataModel(configStoreId, { config }, true);
        return configStoreId;
    }

    onAttachmentRemove() { }
    onToChipRemove = () => {
        this.tolookupParams[LookupFrameworkSetter.SetOptions]([]);
    }
    onCcChipRemove = () => {
        this.cclookupParams[LookupFrameworkSetter.SetOptions]([]);
    }
    onChipIconClick() { }

    validateListNotEmpty(toList, ccList) {
        let noOfReceivers = toList.length + ccList.length;
        if (!noOfReceivers) {
            let message: string = (this.config.localeText && this.config.localeText.receiverRequiredMessage) ?
                this.config.localeText.receiverRequiredMessage : DefaultLocalText.ReceiverRequired;
            this.imNotificationService.Notification('inform', message, "OK", "OK", () => { });
            return false;
        }
        return true;
    }

    mapDataToSend(subject: string) {
        let toList: any[] = this.dmDataModelManagerService.getById(this.taDashbardEmailPopupToChipsConfigModelId).config.model;
        let ccList: any[] = this.dmDataModelManagerService.getById(this.taDashbardEmailPopupCcChipsConfigModelId).config.model;
        if (!this.validateListNotEmpty(toList, ccList)) return;
        let attachments = this.dmDataModelManagerService.getById(this.attachmentListChipsConfigStoreId).config.model;
        this.dmDataModelManagerService.setIn(this.dataModelStoreId, this.config.receiver.data.toArray.split('.'), _.cloneDeep(toList));
        this.dmDataModelManagerService.setIn(this.dataModelStoreId, this.config.receiver.data.ccArray.split('.'), _.cloneDeep(ccList));
        this.dmDataModelManagerService.setIn(this.dataModelStoreId, this.config.attachment.data.split('.'), _.cloneDeep(attachments));
        this.dmDataModelManagerService.setIn(this.dataModelStoreId, this.config.subject.data.split('.'), _.cloneDeep(subject));
        return this.dataModelStoreId;
    }

    onToKeyUp(data, params) {
        this.onLookupKeyup(data, params, ReceiverInput.To);
    }

    onCcKeyup(data, params) {
        this.onLookupKeyup(data, params, ReceiverInput.CC);
    }

    onLookupKeyup(data, params, receiverType) {
        if (!data) {
            params[LookupFrameworkSetter.SetValue](this.defaultLookupValue(this.config));
        } else if (this.config.events.onLookupKeyup && this.scope) {
            this.scope[this.config.events.onLookupKeyup](data, params);
        }
    }

    addBrowsedFile(fileobj) {
        if (!fileobj.returnValue) return;
        let chipsData = this.dmDataModelManagerService.getById(this.attachmentListChipsConfigStoreId).config.model;
        let identifyBy = this.config.attachment.model.identifyBy;
        if (chipsData.find((chipModel) => { return chipModel[identifyBy] == fileobj.returnValue.fileUri })) return;
        let newChipsData = _.cloneDeep(chipsData);
        newChipsData.push({
            [this.config.attachment.model.displayBy]: fileobj.returnValue.fileName,
            [this.config.attachment.model.identifyBy]: fileobj.returnValue.fileUri,
            isRemoveable: true, isDisable: false
        });
        this.dmDataModelManagerService.setIn(this.attachmentListChipsConfigStoreId, ['config', 'model'], _.cloneDeep(newChipsData));
    }

    onToLookupSelect = (data, params) => {
        let chipConfigStoreId: string = this.taDashbardEmailPopupToChipsConfigModelId;
        this.onLookupSelect(data, params, chipConfigStoreId)
    }

    onCcLookupSelect = (data, params) => {
        let chipConfigStoreId: string = this.taDashbardEmailPopupCcChipsConfigModelId;
        this.onLookupSelect(data, params, chipConfigStoreId)
    }

    onLookupSelect(data, params, chipConfigStoreId: string) {
        let identifyBy = this.config.receiver.data.model.identifyBy;
        let displayBy = this.config.receiver.data.model.displayBy;
        if (!data[identifyBy] || !chipConfigStoreId) return;
        let chipsData = this.dmDataModelManagerService.getById(chipConfigStoreId).config.model;
        params[LookupFrameworkSetter.SetValue](this.defaultLookupValue(this.config));
        if (this.checkIfEmailAlreadyExist(data, identifyBy, displayBy)) return;
        let newChipsData = _.cloneDeep(chipsData);
        newChipsData.push({ ...data, isRemoveable: true, isDisable: false });
        this.dmDataModelManagerService.setIn(chipConfigStoreId, ['config', 'model'], _.cloneDeep(newChipsData));
    }

    checkIfEmailAlreadyExist = (data, identifyBy, displayBy) => {
        let ccChipsData = this.dmDataModelManagerService.getById(this.taDashbardEmailPopupCcChipsConfigModelId).config.model;
        let toChipsData = this.dmDataModelManagerService.getById(this.taDashbardEmailPopupToChipsConfigModelId).config.model;
        if (ccChipsData.find((chipModel) => { return (chipModel[identifyBy] + "").toLowerCase().trim() == (data[identifyBy] + "").toLowerCase().trim(); })
            || toChipsData.find((chipModel) => { return (chipModel[identifyBy] + "").toLowerCase().trim() == (data[identifyBy] + "").toLowerCase().trim(); })
        ) {
            let localeText: string = this.config.localeText.recipientsShouldUniqueMessage || DefaultLocalText.ReceipientsShouldBeUnique;
            let message = this.translate.instant(localeText);
            message = message.replace(MessagePlaceHolder.RecipientName, " <b> " + (data[displayBy] || data[identifyBy]) + " </b> ")
            this.imNotificationService.Notification('inform', message, "OK", "OK", () => { });
            return true;
        }
        return false;
    }

    tolookupParams;
    onToLookupComponentInit = (params) => {
        this.tolookupParams = params;
        params[LookupFrameworkSetter.SetValue](this.defaultLookupValue(this.config));
    }

    cclookupParams;
    onCcLookupComponentInit = (params) => {
        this.cclookupParams = params;
        params[LookupFrameworkSetter.SetValue](this.defaultLookupValue(this.config));
    }

    defaultLookupValue(emailPopupConfig: IEmailPopupConfig, value: string = '') {
        return {
            [emailPopupConfig.receiver.data.model.displayBy]: value,
            [emailPopupConfig.receiver.data.model.identifyBy]: value
        };
    }
}
