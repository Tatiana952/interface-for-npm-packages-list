import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NpmPackageComponent } from './components/npm-packages/npm-package/npm-package.component';
import { FilterComponent } from './components/filter/filter.component';
import { ShortenerPipe } from './shared/pipes/shortener.pipe';
import { NpmPackagesComponent } from './components/npm-packages/npm-packages.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NpmPackageComponent,
    FilterComponent,
    ShortenerPipe,
    NpmPackagesComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
