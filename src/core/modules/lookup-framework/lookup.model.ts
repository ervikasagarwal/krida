export interface ILookupConfig {
    type: FieldTypes,
    disabled: boolean,
    invalid: boolean,
    model?: {
        key: string,
        value: string
    },
    optionsFormat: 'keyValue' | 'key' | 'value',
    displayFormat: 'key' | 'value'
    events?: {
        onKeyUp?: string,
        onSelect?: string,
        onClear?: string,
        onViewMore?: string,
        onAgInit?: string,
        onComponentInit?: string
    },
    options: any[],
    value?: any,
    scope?: any
}

export enum FieldTypes {
    Autocomplete = 'autocomplete',
    Select = 'select',
    Text = 'text',
    Date = 'date'
}

export enum DisplayFormats {
    Key = 'key',
    Value = 'value'
}

export enum LookupFrameworkSetter {
    SetOptions = 'setOptions',
    SetInvalid = 'setInvalid',
    SetAbility = 'setAbility',
    SetValue = 'setValue',
    SetFocus = 'setFocus'
}