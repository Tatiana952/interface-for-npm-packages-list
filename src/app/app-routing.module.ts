import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { resolveNpmPackages } from './npm-packages-resolver';
import { NpmPackagesComponent } from './components/npm-packages/npm-packages.component';

const routes: Routes = [
  {
    path: '',
    component: NpmPackagesComponent,
    resolve: [resolveNpmPackages],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
