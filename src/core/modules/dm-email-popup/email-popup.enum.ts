export enum LookupModelKey {
    displayBy = "value",
    identifyBy = "key"
}

export enum LookupOnSelectFunName {
    To = 'onToLookupSelect',
    CC = 'onCcLookupSelect'
}

export enum LookupKeyUpFunName {
    To = 'onToKeyUp',
    CC = 'onCcKeyup'
}

export enum ChipRemoveCallBackFunName {
    To = 'onToChipRemove',
    CC = 'onCcChipRemove'
}

export enum LookupInitCallBackFunName {
    To = 'onToLookupComponentInit',
    CC = 'onCcLookupComponentInit'
}

export enum ReceiverInput {
    To = 'To',
    CC = 'CC'
}

export enum DefaultLocalText {
    SubjectRequired = "Subject is required",
    ReceiverRequired = "Make sure you enter at least one receiver name",
    ReceipientsShouldBeUnique = ":recipientName already exists in the recipient list.",
    Send = "Send",
    Close = "Close",
    Attach = "Attach",
    To = "To",
    CC = "CC",
    Subject = "Subject",
    Title = "Send an E-mail",
    From = "From: ",
}

export enum MessagePlaceHolder {
    RecipientName = ':recipientName'
}
