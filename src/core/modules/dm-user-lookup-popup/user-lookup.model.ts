export interface IUserLookupPopupConfig {
    selectionType: 'single' | 'multiple', //currently supporting only 'single' selection
    options: any[],
    model: {
        key: string, // unique user id
        value: string // value should be user's name 
    },
    confirmRequired: boolean,  //set false if dont need confirm after selection submit  
    confirmationMessage: string,  // use setConfirmationMessage setter function to change confirm message  
    events: {
        onKeyup: string,           // params :-search text , config
        onOverlayClick?: string,   // params:- config
        onSubmit: string,          // params:- config
        onConfirm?: string,         //  params:- config
        onCancel?: string,         //params:- config
        onClose?: string,          // params:- config
    },
    localeText?: {  // Localization
        confirm?: string,
        cancel?: string,
        submit?: string,
        confirmationTitle?: string,
        popupTitle?: string,
        searchInputPlaceholder?: string,
        searchInputLabel?: string
    },
    // setOptions: Function  //setter function call this function to change options list
    // setConfirmationMessage:Function // will provide config in params as read only 
}

export enum UserLookupSetter {
    SetOptions = 'setOptions',
    SetConfirmationMessage = 'setConfirmationMessage'
}