import { Injectable } from '@angular/core';
import { NpmPackage } from '../models/NpmPackage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NpmListManagerService {
  public npmPackages: NpmPackage[] = [];

  public npmPackageDependencies: string[] = [];

  public npmPackageIdSearch: Subject<string> = new Subject<string>();
  public npmPackagesChanged = new Subject<NpmPackage[]>();
  public npmPackagesDependenciesChanged = new Subject<string[]>();
  public npmPackageResetBackgroundColor = new Subject();

  /**
   * Локально сохраняет массив npm пакетов и пробрасывает его копию слушателям Subject
   * @param npmPackages Массив npm пакетов для сохранения
   */
  public setNpmPackagesList(npmPackages: NpmPackage[]): void {
    this.npmPackages = npmPackages;
    this.npmPackagesChanged.next(this.npmPackages.slice());
  }

  /**
   * Возвращает локальный массив npm пакетов
   * @returns Локальный массив npm пакетов
   */
  public getNpmPackagesList(): NpmPackage[] {
    return this.npmPackages.slice();
  }

  /**
   * Фильтрует копию локального массива npm пакетов по заданному id и пробрасывает её слушателям Subject
   * @param id Заданный id для фильтрации
   */
  public filterNpmPackages(id: string): void {
    this.npmPackagesChanged.next(
      this.npmPackages
        .slice()
        .filter((npmPackage) => npmPackage.id.includes(id))
    );
  }

  /**
   * Локально сохраняет массив зависимостей для npm пакета и пробрасывает массив слушателям Subject
   * @param dependencies Массив зависимостей для сохранения
   */
  public setNpmPackageDependencies(dependencies: string[]): void {
    this.npmPackageDependencies = [];
    let filteredDependencies: string[] = [];
    filteredDependencies =
      this.filterDependenciesPackagesByLocalNpmPackagesList(dependencies);
    if (filteredDependencies.length > 0) {
      this.npmPackageDependencies = filteredDependencies;
      this.npmPackagesDependenciesChanged.next(this.npmPackageDependencies);
    }
  }

  /**
   * Фильтрует переданный массив зависимостей по локально хранящемуся массиву npm пакетам.
   * @param dependencies Массив зависимостей для фильтрации
   * @returns Отфильтрованный массив зависимостей
   */
  private filterDependenciesPackagesByLocalNpmPackagesList(
    dependencies: string[]
  ): string[] {
    return dependencies.filter((dependencyPackage) => {
      let returnedPackage: string = '';
      this.npmPackages.forEach((npmPackage) => {
        if (npmPackage.id === dependencyPackage) {
          returnedPackage = dependencyPackage;
        }
      });
      return returnedPackage;
    });
  }
}
