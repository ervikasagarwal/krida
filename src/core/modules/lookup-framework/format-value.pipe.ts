import { Pipe, PipeTransform } from '@angular/core';
import { ILookupConfig } from './lookup.model';

@Pipe({ name: 'formatValue' })
export class FormatValuePipe implements PipeTransform {
    transform(previousValue, params: ILookupConfig) {
        return previousValue[params.model.value];
    }
}