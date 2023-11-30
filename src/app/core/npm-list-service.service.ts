import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
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

  public getNpmPackagesList(): Observable<NpmPackage[]> {
    return this.httpClient.get<NpmPackage[]>('/packages').pipe(
      tap((npmPackages) => {
        this.npmListManager.setNpmPackagesList(npmPackages);
      })
    );
  }

  public getNpmPackageDependencies(id: string): Observable<string[]> {
    let newId = id;
    if (id.includes('@') && id.includes('/')) {
      newId = id.replace('@', '%40').replace('/', '%2F');
    }
    return this.httpClient
      .get<string[]>(`/packages/${newId}/dependencies`)
      .pipe(
        tap((npmPackagesDependencies) => {
          this.npmListManager.setNpmPackageDependencies(
            npmPackagesDependencies
          );
        })
      );
  }
}
