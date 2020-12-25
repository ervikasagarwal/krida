import { Language } from './../../assets/constants/app.enum';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable()
export class ConstantsService {
    variableName: string = "value";
    languages:Language[] = [Language.Hindi,Language.English];
    selectedLanguage:Subject<Language> = new BehaviorSubject(Language.English);
   
}
