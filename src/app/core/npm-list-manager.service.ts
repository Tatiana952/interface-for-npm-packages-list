import { Injectable } from '@angular/core';
import { NpmPackage } from '../models/NpmPackage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NpmListManagerService {
  public npmPackages: NpmPackage[] = [];

  public npmPackageDependencies: string[] = [];

  public npmPackageID: Subject<string> = new Subject<string>();
  public npmPackagesChanged = new Subject<NpmPackage[]>();
  public npmPackagesDependenciesChanged = new Subject<string[]>();
  public npmPackageResetBackgroundColor = new Subject<string[]>();

  public setNpmPackagesList(npmPackages: NpmPackage[]): void {
    this.npmPackages = npmPackages;
    this.npmPackagesChanged.next(this.npmPackages.slice());
  }

  public getNpmPackagesList(): NpmPackage[] {
    return this.npmPackages.slice();
  }

  public filterNpmPackages(id: string): void {
    this.npmPackagesChanged.next(
      this.npmPackages
        .slice()
        .filter((npmPackage) => npmPackage.id.includes(id))
    );
  }

  public setNpmPackageDependencies(dependencies: string[]) {
    // console.log(dependencies);
    let filteredDependencies: string[] = [];
    filteredDependencies = dependencies.filter((dependencyPackage) => {
      let forReturn: string = '';
      this.npmPackages.forEach((npmPackage) => {
        if (npmPackage.id === dependencyPackage) {
          forReturn = dependencyPackage;
        }
      });
      return forReturn;
    });
    // console.log(filteredDependencies);
    if (filteredDependencies.length > 0) {
      this.npmPackageDependencies = filteredDependencies;
      this.npmPackagesDependenciesChanged.next(this.npmPackageDependencies);
    }
  }
}
