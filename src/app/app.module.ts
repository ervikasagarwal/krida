import { KridaTvHeaderComponent } from './ktv-header/ktv-header.component';
// import { KridaTvHeaderModule } from './ktv-header/ktv-header.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent,
    KridaTvHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    debugger;
  }
}
