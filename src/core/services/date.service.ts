import { Injectable } from "@angular/core";
import * as momentImported from 'moment';
const moment = momentImported;

export interface IDateConfig {
    //**userCountryCultureCode */
    locale?: string;
    //** user's profile timeZone */
    offset?: number;
    //** Date Format */
    format?: string;
    //** Date string "ISO format Preferred" | Object */
    model: string | any;

}

@Injectable()
export class DmDateService {
    constructor() {

    }
    lang: string;
    localeOffset: number;
    userCountryCultureInfo: string;

    customDateFormat: any = {
        "en-US": "MM/DD/YYYY",
        "default": "DD/MM/YYYY"
    };


    getUserCountryCultureInfo() {
        return this.userCountryCultureInfo;
    }

    setUserCountryCultureInfo(val: string, lang: string) {
        if (!lang) {
            this.lang = "en-in"; 
        }
        else {
            this.lang = lang;
        }
        this.userCountryCultureInfo = val;

        moment.locale(val);
        let countryFormat = moment.localeData()["_longDateFormat"]["L"];
        moment.locale(this.lang);
        moment.localeData()["_longDateFormat"]["L"] = countryFormat;

        if (this.customDateFormat.hasOwnProperty(val)) {
            moment.localeData()["_longDateFormat"]["L"] = this.customDateFormat[val];
        }
    }

    setLocaleOffset(val: number) {
        this.localeOffset = val;
    }

    getLocaleOffset() {
        return this.localeOffset;
    }

    formatDate(formatConfig: IDateConfig): string {
        let dateStr = '';
        if (formatConfig.locale) {
            this.setUserCountryCultureInfo(formatConfig.locale, this.lang);
        } else {
            formatConfig.locale == this.getUserCountryCultureInfo();
        }
        if (formatConfig.offset) {
            this.setLocaleOffset(formatConfig.offset);
        } else {
            formatConfig.offset = this.getLocaleOffset();
        }
        if (typeof formatConfig.format == 'undefined' || formatConfig.format.trim() === '') {
            formatConfig.format = moment.localeData().longDateFormat('L');
        }
        dateStr = moment(formatConfig.model).format(formatConfig.format);
        return dateStr;
    }

    convertToDateObject(isoDate: string) {
        return new Date(isoDate);
    }

    //depends on user profile
    getTimezoneDate(UTCDateISOStr: string, offset) {
        let d = new Date(UTCDateISOStr);

        // convert to msec since Jan 1 1970
        let localTime = new Date(d.toUTCString()).getTime();

        // obtain local UTC offset and convert to msec
        let localOffset = d.getTimezoneOffset() * 60000; //converting minutes to milliseconds involves multiplying by 60 * 1000 = 60000.

        // get UTC time in msec
        let utc = localTime + localOffset;
        //get user time zone in ms
        let userProfileDate = new Date(utc + (3600000 * offset));
        
        //return (new Date(now));
        return userProfileDate;
    }




}
