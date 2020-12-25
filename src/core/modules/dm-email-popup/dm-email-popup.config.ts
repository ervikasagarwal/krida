import { IChipHost } from "../dm-nextgen-chips/dm-chip-host.interface";
import { IDmDragAndDropConfig } from "../dm-drag-and-drop/dm-drag-drop.model";
import { ILookupConfig, FieldTypes } from "../lookup-framework/lookup.model";
import { IDmPopupConfig } from "dm-nextgen-popup";

export let toEmailLookupConfig: ILookupConfig = {
    type: FieldTypes.Autocomplete,
    disabled: false,
    invalid: false,
    model: {
        key: 'email',
        value: 'userName'
    },
    optionsFormat: "value",
    displayFormat: "value",
    events: {
        onKeyUp: '',
        onSelect: '',
        onComponentInit: ''
    },
    options: [],
    scope: null,
    value: {}
}

export let emailReceiverChipsConfig: IChipHost = {
    isAllRemoveable: false,
    isAllDisable: false,
    isMultiLine: true,
    model: [],
    chipDetails: {
        cssClass: {
            position: 'chips-wrap', //chips-nowrap',  //| 'chips-wrap';
            style: ''
        },
        displayBy: '',
        identifyBy: '',
        events: {
            remove: '',
            // iconClick: 'onChipIconClick'
        },
        // icon: {cssClass: 'to-chips-icon',icon: '#icon_Close',isSVG: true}
    },
    postModule: {
        path: '',
        childConfig: null
    }
}

export let attachmentListChipsConfig: IChipHost = {
    isAllRemoveable: false,
    isAllDisable: false,
    isMultiLine: true,
    model: [],
    chipDetails: {
        cssClass: {
            position: 'chips-wrap', //chips-nowrap',  //| 'chips-wrap';
            style: 'email-attachment'
        },
        displayBy: '',
        identifyBy: '',
        events: {
            remove: 'onAttachmentRemove',
            // iconClick: 'onChipIconClick'
        },
        icon: { cssClass: 'to-chips-icon', icon: '#image_file', isSVG: true }
    }
}


export let emailDragAndDropConfig: IDmDragAndDropConfig = {
    uploadType: 'single',
    fileType: ['doc', 'docx', 'jpg', 'pdf', 'ppt', 'pptx', 'rtf', 'xls', 'xlsx', 'xlsxd', '7z', 'bmp', 'csv', 'epub', 'gif', 'html', 'mht', 'jpeg', 'msg', 'odm', 'odt',
        'oft', 'pages', 'ott', 'png', 'pps', 'rar', 'zip', 'sdw', 'stw', 'sxw', 'wpd', 'wps', 'eml', 'ical', 'ics', 'mpp', 'mpt', 'odp', 'ods', 'tif', 'vdx',
        'vsd', 'vst', 'vtx', 'wtx'],
    maxFileSize: 10485760,
    customDocId: 0,
    fileNameMaxLength: 50,
    events: {
        afterFileSave: 'afterFileSave'
    },
    saveUrl:null
}

export let emailBrowserPopupConfig: IDmPopupConfig = {
    manifestPath: 'dm-file-drag-drop/uploadFile',
    modalType: 'dynamic-size',
    position: 'center',
    isDismissible: true,
    events: {
        click: 'onFileBrowsePopupCloseClick'
    },
    childconfig: null,
    iconinjectorconfig: { cssClass: '', icon: '#icon_Close', isSVG: true }
};