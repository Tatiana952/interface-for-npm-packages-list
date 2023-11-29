import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NpmPackageComponent } from './components/npm-package/npm-package.component';
import { FilterComponent } from './components/filter/filter.component';
import { ShortenerPipe } from './shared/pipes/shortener.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NpmPackageComponent,
    FilterComponent,
    ShortenerPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
