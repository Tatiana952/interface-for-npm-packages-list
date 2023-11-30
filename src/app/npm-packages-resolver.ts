import { ResolveFn } from '@angular/router';
import { NpmPackage } from './models/NpmPackage';
import { NpmListService } from './core/npm-list-service.service';
import { NpmListManagerService } from './core/npm-list-manager.service';
import { inject } from '@angular/core';

export const resolveNpmPackages: ResolveFn<NpmPackage[]> = () => {
  let npmPackages = inject(NpmListManagerService).getNpmPackagesList();
  if (npmPackages.length === 0) {
    return inject(NpmListService).getNpmPackagesList();
  }
  return npmPackages;
};
