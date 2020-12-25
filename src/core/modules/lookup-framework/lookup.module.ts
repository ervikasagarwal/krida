import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridLookupFrameworkComponent } from './lookup.component';
import { RouterModule, Routes } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import * as momentImported from 'moment';
import { FormatValuePipe } from './format-value.pipe';
import { DateMethodsService } from 'src/core/services/date.service';
import { MatDateFormats, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

const moment = momentImported;

const routes: Routes = [
    {
        path: 'lookup',
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
    declarations: [AgGridLookupFrameworkComponent, FormatValuePipe],
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
        // RouterModule.forChild(routes)
    ],

    exports: [
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        AgGridLookupFrameworkComponent
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useFactory: localeIdFactory, deps: [DateMethodsService] },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    ],
    entryComponents: [AgGridLookupFrameworkComponent]
})
export class AgGridLookupFrameworkModule { }
