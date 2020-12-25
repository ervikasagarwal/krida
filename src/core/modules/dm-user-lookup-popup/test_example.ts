import { IUserLookupPopupConfig } from "./user-lookup.model";

//example config
export let userLookupConfig: IUserLookupPopupConfig = {
    selectionType: 'single',
    options: [],
    model: {
        key: 'id',
        value: 'name'
    },
    confirmRequired: true,
    confirmationMessage: 'Are you sure, do you want to Add ":userName" as Ad-hoc Approver.',
    events: {
        onKeyup: 'onUserSearchKeyup',
        // onOverlayClick: 'onOvarlayClick',
        onConfirm: 'onLookupSelectionConfim',
        onSubmit: 'onLookupSelectedSubmit',
        onCancel: 'onOvarlayClick',
        onClose: 'onOvarlayClick'
    },
    localeText: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        submit: 'Add Ad-hoc Approver',
        confirmationTitle: 'Ad-hoc Approvals Confirmation',
        popupTitle: 'Ad-hoc Approval',
        searchInputPlaceholder: 'Type Members Name',
        searchInputLabel: 'ADD MEMBER'
    }
}

// data and function to mock api
export let usersList =
    [
        { id: 1, name: 'John Smith' },
        { id: 2, name: 'Bill' },
        { id: 3, name: 'Vikash Agrawal' },
        { id: 4, name: 'Amey More' },
        { id: 5, name: 'Wael Yu' },
        { id: 6, name: 'Trupti Mali' },
        { id: 7, name: 'Gyan chand Khater' },
        { id: 8, name: 'John Smith' },
        { id: 9, name: 'Test user 1' },
        { id: 10, name: 'Test user 2' },
        { id: 11, name: 'Suraj Sheety' },
        { id: 12, name: 'Amar akbar' },
        { id: 13, name: 'Neil Nitin Mukesh' },
        { id: 14, name: 'Darren Sq' },
        { id: 15, name: 'Test user 3' },
        { id: 16, name: 'Test user 4' },
        { id: 17, name: 'Test user 5' },
        { id: 18, name: 'Test user 6' },
        { id: 19, name: 'Test qc user 7' },
        { id: 20, name: 'Test qc user 8' },
        { id: 21, name: 'Test qc user 9' },
        { id: 22, name: 'Test qc user 10' },
    ]

export function getRandomUsers(searchText: string) {
    return usersList.filter((user) => { return user.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) });
}