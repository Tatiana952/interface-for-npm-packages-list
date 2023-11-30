import { ResolveFn } from '@angular/router';
import { NpmPackage } from '../models/NpmPackage';
import { NpmListService } from './npm-list-service.service';
import { NpmListManagerService } from './npm-list-manager.service';
import { inject } from '@angular/core';

/**
 * Резолвер для получения массива npm пакетов перед отображением компонента
 * @returns Массив npm пакетов
 */
export const resolveNpmPackages: ResolveFn<NpmPackage[]> = () => {
  let npmPackages = inject(NpmListManagerService).getNpmPackagesList();
  if (!npmPackages.length) {
    return inject(NpmListService).getNpmPackagesList();
  }
  return npmPackages;
};
