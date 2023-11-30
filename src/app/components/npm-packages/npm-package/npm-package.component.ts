import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NpmListManagerService } from 'src/app/core/npm-list-manager.service';
import { NpmListService } from 'src/app/core/npm-list-service.service';
import { NpmPackage } from 'src/app/models/NpmPackage';

@Component({
  selector: 'app-npm-package',
  templateUrl: './npm-package.component.html',
  styleUrls: ['./npm-package.component.css'],
})
export class NpmPackageComponent implements OnInit, OnDestroy {
  @Input() npmPackage: NpmPackage;

  @ViewChild('packageTitle') packageTitle: ElementRef;

  public slashPosition: number;
  public npmPackageIdParts: string[] = [];

  private npmPackageDependencies: string[] = [];

  private npmPackageDependenciesSubscription: Subscription;
  private npmPackagesDependenciesChangedSubscription: Subscription;
  private npmPackagesResetBackgroundColorSubscription: Subscription;

  constructor(
    private npmListService: NpmListService,
    private npmListManager: NpmListManagerService
  ) {}

  ngOnInit(): void {
    this.slashPosition = this.npmPackage.id.indexOf('/');
    if (this.slashPosition !== -1) {
      this.npmPackageIdParts = this.npmPackage.id.split('/');
    }

    this.npmPackagesDependenciesChangedSubscription =
      this.npmListManager.npmPackagesDependenciesChanged.subscribe(
        (id: string[]) => {
          this.npmPackageDependencies = id;
          if (id.includes(this.npmPackage.id)) {
            this.packageTitle.nativeElement.style.backgroundColor = '#eca9a9ad'; //light-red color
          }
        }
      );

    this.npmPackagesResetBackgroundColorSubscription =
      this.npmListManager.npmPackageResetBackgroundColor.subscribe(
        (npmPackageDependencies) => {
          // if (npmPackageDependencies.includes(this.npmPackage.id)) {
            this.packageTitle.nativeElement.style.backgroundColor = '#fff';
          // }
        }
      );
  }

  ngOnDestroy(): void {
    this.npmPackageDependenciesSubscription.unsubscribe();
    this.npmPackagesDependenciesChangedSubscription.unsubscribe();
    this.npmPackagesResetBackgroundColorSubscription.unsubscribe();
  }

  @HostListener('mouseenter') onMouseOver() {
    this.packageTitle.nativeElement.style.backgroundColor = '#a9ecbbad'; //light-green color
    this.npmPackageDependenciesSubscription = this.npmListService
      .getNpmPackageDependencies(this.npmPackage.id)
      .subscribe();
  }

  @HostListener('mouseleave') onMouseOut() {
    this.packageTitle.nativeElement.style.backgroundColor = '#fff';
    if (this.npmPackageDependencies.length > 0) {
      this.npmListManager.npmPackageResetBackgroundColor.next(
        this.npmPackageDependencies
      );
    }
    this.npmPackageDependenciesSubscription.unsubscribe();
  }
}
