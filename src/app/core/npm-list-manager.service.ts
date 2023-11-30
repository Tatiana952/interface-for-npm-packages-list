import { Injectable } from '@angular/core';
import { NpmPackage } from '../models/NpmPackage';
import { Subject } from 'rxjs';
import { NpmPackageDependencies } from '../models/NpmPackageDependencies';

@Injectable({
  providedIn: 'root',
})
export class NpmListManagerService {
  public npmPackageDependenciesMap: Map<string, string[]> = new Map<
    string,
    string[]
  >();

  public npmPackageResetBackgroundColor = new Subject();
  public npmPackagesChanged = new Subject<NpmPackage[]>();
  public npmPackageIdSearch: Subject<string> = new Subject<string>();
  public npmPackagesDependenciesChanged = new Subject<NpmPackageDependencies>();

  private npmPackages: NpmPackage[] = [];

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
        .filter((npmPackage) =>
          npmPackage.id.toLowerCase().includes(id.toLowerCase())
        )
    );
  }

  /**
   * Сохраняет в Map массив зависимостей для npm пакета, его id и пробрасывает эту информацию слушателям Subject
   * @param parentId Родитель/потребитель этих зависимостей
   * @param dependencies Массив зависимостей для сохранения
   */
  public setNpmPackageDependencies(
    parentId: string,
    dependencies: string[]
  ): void {
    let filteredDependencies: string[] = [];
    filteredDependencies =
      this.filterDependenciesPackagesByLocalNpmPackagesList(dependencies);
    this.npmPackageDependenciesMap.set(parentId, filteredDependencies);
    if (filteredDependencies.length) {
      this.npmPackagesDependenciesChanged.next(
        new NpmPackageDependencies(parentId, filteredDependencies)
      );
    }
  }

  /**
   * Фильтрует переданный массив зависимостей по локально хранящемуся массиву npm пакетов.
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
