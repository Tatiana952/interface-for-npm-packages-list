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
  private npmPackageIdSubscription: Subscription;

  constructor(public npmListManagerService: NpmListManagerService) {}

  ngOnInit(): void {
    this.npmPackagesListSubscription =
      this.npmListManagerService.npmPackagesChanged.subscribe((npmPackages) => {
        return (this.npmPackages = npmPackages);
      });
    this.npmPackageIdSubscription =
      this.npmListManagerService.npmPackageID.subscribe((npmPackageID) =>
        this.npmListManagerService.filterNpmPackages(npmPackageID)
      );
    this.npmPackages = this.npmListManagerService.getNpmPackagesList();
  }

  ngOnDestroy(): void {
    this.npmPackagesListSubscription.unsubscribe();
    this.npmPackageIdSubscription.unsubscribe();
  }
}
