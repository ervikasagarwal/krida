export interface IEmailPopupConfig {
    header: {
        fromData?: string,  
        onCloseClick?: string
    },
    events: {
        onClose: string,
        onSend: string,
        onLookupKeyup: string
    },
    subject: {
        maxLength?: number,
        editable?: boolean,
        required?: boolean,
        data: string
    },
    receiver: {
        data: {
            toArray: string,
            ccArray: string,
            model: {
                displayBy: string,
                identifyBy: string,
            },
        },
        optionsFormat: 'displayBy' | 'identifyBy',
        displayFormat: 'displayBy' | 'identifyBy',
        // allowCustomEmail?: boolean,  //dafault value is false
    },
    attachment?: {
        data: string,
        model: {
            displayBy: string,
            identifyBy: string,
        },
        saveUrl
        // maxAllowedSize: number,
        // maxNoOfAttachments?: number,
        // attachmentTypes: string,
    },
    body: {
        // editable?: boolean, //not having this functionality right now 
        modulePath: string,
        childConfig: any
    },
    localeText?: {
        send?: string,
        close?: string,
        attach?: string,
        to?: string,
        cc?: string,
        subject?: string,
        title?: string,
        from?: string,
        subjectRequiredMessage?: string,
        receiverRequiredMessage?: string,
        recipientsShouldUniqueMessage?: string
    }

}