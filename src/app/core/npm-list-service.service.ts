import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, tap } from 'rxjs';
import { NpmPackage } from '../models/NpmPackage';
import { NpmListManagerService } from './npm-list-manager.service';

@Injectable({
  providedIn: 'root',
})
export class NpmListService {
  constructor(
    private httpClient: HttpClient,
    private npmListManager: NpmListManagerService
  ) {}

  /**
   * Получает данные от API о массиве npm пакетов и передает их на локальное хранение
   * @returns Поток данных в виде массива npm пакетов
   */
  public getNpmPackagesList(): Observable<NpmPackage[]> {
    return this.httpClient.get<NpmPackage[]>('/packages').pipe(
      tap((npmPackages) => {
        this.npmListManager.setNpmPackagesList(npmPackages);
      })
    );
  }

  /**
   * Получает от API массив зависимостей npm пакета и передает его на локальное хранение
   * @param id id npm пакета, для которого надо узнать зависимости
   * @returns Поток данных в виде массива зависимостей
   */
  public getNpmPackageDependencies(id: string): Observable<string[]> {
    let newId = id;
    if (id.includes('@') && id.includes('/')) {
      newId = id.replace('@', '%40').replace('/', '%2F');
    }
    return this.httpClient
      .get<string[]>(`/packages/${newId}/dependencies`)
      .pipe(
        filter((npmPackagesDependencies) => npmPackagesDependencies.length > 0),
        tap((npmPackagesDependencies) => {
          this.npmListManager.setNpmPackageDependencies(
            npmPackagesDependencies
          );
        })
      );
  }
}
