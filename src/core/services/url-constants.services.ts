import { Injectable } from '@angular/core';
@Injectable()
export class UrlConstants {
    public URLs: any = {};
    private domainURL: string = "https://www.ktv.com";
    private subPath: string = '';
    private BaseURL: string;
    private CoreBaseURL: string;
    constructor() {
        this.BaseURL = this.domainURL + this.subPath;
        this.URLs = {
            GET_URL: this.BaseURL + 'TurnAround/GetAllIssuesList',
        }
    }
}
