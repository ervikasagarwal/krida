import { IUserLookupPopupConfig } from './user-lookup.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'iconText' })
export class IconTextPipe implements PipeTransform {
    transform(user, config: IUserLookupPopupConfig) {
        let userName = user[config.model.value];
        return (userName.charAt(0) + (
            (userName.lastIndexOf(' ') == -1) ? "" : userName.charAt(userName.lastIndexOf(' ') + 1))).toUpperCase();
    }
}