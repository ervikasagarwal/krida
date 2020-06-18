import { Injectable } from '@angular/core';
import * as momentImported from 'moment';
const moment = momentImported;
@Injectable()
export class CommonMethodService {
    constructor() { }

    escapeBackslashesAndQuotes(text: string) {
        text = text.replace(/\\/g, '\\\\'); // escape backslashes
        text = text.replace(/"/g, '\\"');   // escape quotes
        text = text.replace(/'/g, '\\"');  // replacing ' to "
        return text;
    }

    validateDecimal(value) {
        let RE = new RegExp(/^\d+(?:\.\d{1,3})?$/);
        if (RE.test(value + "")) {
            return true;
        } else {
            return false;
        }
    }

    encodeSpecialCharacter(items: any[], freeTextFields: string[]) {
        items.forEach((row) => {
            freeTextFields.forEach((field) => {
                if (row[field]) {
                    row[field] = this.escapeBackslashesAndQuotes("" + row[field]);
                }
            })
        })
    }

    validateSpecialCharector(value, allowedSpecialCharacter) {
        let regExp = /[^a-zA-Z0-9#\-]/;
        if (regExp.test(value)) {
            return false;
        }
        return true;
    }

    convertUTCDateToLocalDate(date) {
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
        newDate.setHours(hours - offset);
        return newDate;
    }

    convertDateToLocalDate(date) {
        date = date.replace('Z', '');
        return new Date(date + 'Z').toISOString();
    }

    getFormattedDate(date) {
        date = this.convertDateToLocalDate(date);
        return moment(date).format('L');
    }

    encodeAngleBracket(value: string) {
        value = value.replace(/</gi, "&lt;");
        value = value.replace(/>/gi, "&gt;");
        return value;
    }

    decodeAngleBracket(value: string): string {
        value = value.replace(/&lt;/gi, "<");
        value = value.replace(/&gt;/gi, ">");
        return value;
    }

    escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/\//g, "&#x2F;")
    }

    getUTCDateWithDefaultTime() {
        return new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
    }

    getMonthBackDate() {
        let date = new Date();
        date.setDate(date.getDate() - 30);
        return new Date(date.setHours(0, 0, 0, 0)).toISOString()
    }

    // createDocumentLink(action: TaAction, documentId: number) {
    //     let url: string = window.location.href;
    //     let lastIndex: number = url.indexOf(this.taConstants.navigationUrls.basePath) + this.taConstants.navigationUrls.basePath.length;
    //     let domainUrl: string = url.substring(0, lastIndex);
    //     let stockMovementRoute: string = this.taConstants.navigationUrls.stockMovementRoute;
    //     let mainUrl: string = domainUrl + stockMovementRoute;
    //     mainUrl = mainUrl.replace(TaRouteParamPlaceholder.Action, action);
    //     mainUrl = mainUrl.replace(TaRouteParamPlaceholder.DocumentId, "" + documentId);
    //     return mainUrl;
    // }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}
