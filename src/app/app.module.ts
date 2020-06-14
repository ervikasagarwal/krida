import { KridaTvHeaderComponent } from './ktv-header/ktv-header.component';
// import { KridaTvHeaderModule } from './ktv-header/ktv-header.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KridaTvHeaderModule } from './ktv-header/ktv-header.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KridaTvHeaderModule, 
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
  }
}
