export interface ILookupConfig {
    type: FieldTypes,
    disabled: boolean,
    invalid: boolean,
    inputStyle?: any,
    model?: {
        key: string,
        value: string
    },
    // minDate?: Date,
    // maxDate?: Date,
    optionsFormat: 'keyValue' | 'key' | 'value',
    displayFormat: 'key' | 'value',
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
    gridService?: any // add by grid-nex plugin
    data?: any //part of grid params 
    colDef?: { field: string },//part of grid params
    setValue: Function, // setter function provided by grid
    scope?: any,

    setOptions?: Function  //setter
    setInvalid?: Function  //setter 
    setSelectedValue?: Function //setter
}

export enum FieldTypes {
    Autocomplete = 'autocomplete',
    Dropdown = 'dropdown',
    Text = 'text',
    // Date = 'date'
}

export enum DisplayFormats {
    Key = 'key',
    Value = 'value'
}

export enum LookupFrameworkSetter {
    SetOptions = 'setOptions',
    SetInvalid = 'setInvalid',
    SetAbility = 'setAbility',
    SetValue = 'setSelectedValue',
    SetFocus = 'setFocus',
    RenderValueAsAText = 'renderValueAsAText'
}




//if it is used in ag grid 
// 1. add 'im-common-lookup-framework-ag-grid-base-class' class to parant of the ag grid
/// 2. add 'grid-lookup-ag-grid-cell' to the cell eg.  "cellClass": ["grid-lookup-ag-grid-cell"], 