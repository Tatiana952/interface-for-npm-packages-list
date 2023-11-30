import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { resolveNpmPackages } from './core/npm-packages-resolver';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    resolve: [resolveNpmPackages],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
