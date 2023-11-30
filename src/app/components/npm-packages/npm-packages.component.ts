import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NpmListManagerService } from 'src/app/core/npm-list-manager.service';
import { NpmPackage } from 'src/app/models/NpmPackage';

@Component({
  selector: 'app-npm-packages',
  templateUrl: './npm-packages.component.html',
  styleUrls: ['./npm-packages.component.css'],
})
export class NpmPackagesComponent implements OnInit, OnDestroy {
  public npmPackages: NpmPackage[];

  private npmPackagesListSubscription: Subscription;
  private npmPackageIdSearchSubscription: Subscription;

  constructor(public npmListManagerService: NpmListManagerService) {}

  ngOnInit(): void {
    this.npmPackages = this.npmListManagerService.getNpmPackagesList();

    this.npmPackagesListSubscription =
      this.npmListManagerService.npmPackagesChanged.subscribe((npmPackages) => {
        return (this.npmPackages = npmPackages);
      });
    this.npmPackageIdSearchSubscription =
      this.npmListManagerService.npmPackageIdSearch.subscribe((npmPackageID) =>
        this.npmListManagerService.filterNpmPackages(npmPackageID)
      );
  }

  ngOnDestroy(): void {
    this.npmPackagesListSubscription.unsubscribe();
    this.npmPackageIdSearchSubscription.unsubscribe();
  }
}
