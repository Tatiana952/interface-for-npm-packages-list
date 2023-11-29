import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NpmPackage } from '../models/NpmPackage';

@Injectable({
  providedIn: 'root',
})
export class NpmListService {
  public npmPackages: NpmPackage[];

  constructor(private httpClient: HttpClient) {}

  public getNpmList(): Observable<NpmPackage[]> {
    return this.httpClient.get<NpmPackage[]>('/packages').pipe(
      tap((npmPackages) => {
        return this.npmPackages = npmPackages;
      })
    );
  }
}
