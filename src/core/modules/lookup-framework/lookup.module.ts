import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridLookupFrameworkComponent } from './lookup.component';
import { RouterModule, Routes } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatDatepickerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import * as momentImported from 'moment';
import { FormatValuePipe } from './format-value.pipe';
import { DateMethodsService } from 'src/core/services/date.service';
const moment = momentImported;

const routes: Routes = [
    {
        path: '',
        component: AgGridLookupFrameworkComponent
    }
]

export function localeIdFactory(dateService: DateMethodsService) {
    return dateService.getUserCountryCultureInfo();
}

export const MAT_MOMENT_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: moment.localeData().longDateFormat('L'),
    },
    display: {
        dateInput: moment.localeData().longDateFormat('L'),
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@NgModule({
    imports: [
        CommonModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatFormFieldModule,
        TranslateModule,
        MatDatepickerModule,
        RouterModule.forChild(routes)
    ],

    exports: [
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useFactory: localeIdFactory, deps: [DateMethodsService] },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    ],
    declarations: [AgGridLookupFrameworkComponent, FormatValuePipe],
    entryComponents: [AgGridLookupFrameworkComponent]
})
export class AgGridLookupFrameworkModule { }
