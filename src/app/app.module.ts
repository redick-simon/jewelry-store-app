import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopUpComponent } from './dynamic-component/pop-up.component';
import { PluginDirective } from './directives/plugin-directive';
import { LoginComponent } from './login/login.component';
import { JewelryComponent } from './jewelry/jewelry.component';

@NgModule({
  declarations: [
    AppComponent,
    PluginDirective,
    PopUpComponent,
    LoginComponent,
    JewelryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
