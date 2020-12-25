import { Injectable } from '@angular/core';
import * as momentImported from 'moment';
import { IUserLookupPopupConfig } from './user-lookup.model';

const moment = momentImported;
@Injectable()
export class UserLookupService {

    constructor() { }
    submitBtnConfigStoreId = 'userLookupPopupSubmitBtnConfig';
    cancelBtnConfigStoreId = 'userLookupPopupCancelBtnConfig';
    confirmBtnConfigStoreId = 'userLookupPopupConfirmBtnConfig';
    defaultLocalText = {
        confirm: 'Confirm',
        cancel: 'Cancel',
        submit: 'Submit',
        confirmationTitle: 'Ad-hoc Approvals Confirmation',
        popupTitle: 'Ad-hoc Approval',
        searchInputPlaceholder: 'Type Members Name',
        searchInputLabel: 'ADD MEMBER',
        confirmationMessage: 'Are you sure, do you want to Add ":userName" as Ad-hoc Approver.'
    }

    config: IUserLookupPopupConfig;
    scope: any;

    submitBtnConfig = {
        'title': this.defaultLocalText.submit,
        'whiteSecondaryBtn': false,
        'disable': true, 'flat': false, 'isFloating': false
    }
    cancelBtnConfig = { 'title': this.defaultLocalText.cancel, 'whiteSecondaryBtn': true };
    confirmBtnConfig = {
        'title': this.defaultLocalText.confirm,
        'whiteSecondaryBtn': false,
        'disable': false, 'flat': false, 'isFloating': false
    }

    getDefaultUserDetailObj() {
        return { [this.config.model.key]: '', [this.config.model.value]: '' };
    }
}
