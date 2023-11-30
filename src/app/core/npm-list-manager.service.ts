import { Injectable } from '@angular/core';
import { NpmPackage } from '../models/NpmPackage';
import { Subject } from 'rxjs';
import { NpmPackageDependencies } from '../models/NpmPackageDependencies';

@Injectable({
  providedIn: 'root',
})
export class NpmListManagerService {
  public npmPackages: NpmPackage[] = [];

  public npmPackageDependencies: NpmPackageDependencies;
  public npmPackageDependenciesMap: Map<string, string[]> = new Map<
    string,
    string[]
  >();

  public npmPackageIdSearch: Subject<string> = new Subject<string>();
  public npmPackagesChanged = new Subject<NpmPackage[]>();
  public npmPackagesDependenciesChanged = new Subject<NpmPackageDependencies>();
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
        .filter((npmPackage) =>
          npmPackage.id.toLowerCase().includes(id.toLowerCase())
        )
    );
  }

  /**
   * Локально сохраняет массив зависимостей для npm пакета, его id в словарь и пробрасывает словарь слушателям Subject
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
      this.npmPackageDependencies = new NpmPackageDependencies(
        parentId,
        filteredDependencies
      );
      this.npmPackagesDependenciesChanged.next(this.npmPackageDependencies);
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
