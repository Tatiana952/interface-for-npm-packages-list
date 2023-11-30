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
import { NpmPackageDependencies } from 'src/app/models/NpmPackageDependencies';

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
        (npmPackageDependencies) => {
          this.npmPackageDependencies = npmPackageDependencies.dependenciesId;
          if (
            npmPackageDependencies.dependenciesId.includes(this.npmPackage.id)
          ) {
            this.packageTitle.nativeElement.style.backgroundColor = '#eca9a9ad'; //light-red color
          }
        }
      );

    this.npmPackagesResetBackgroundColorSubscription =
      this.npmListManager.npmPackageResetBackgroundColor.subscribe(() => {
        if (this.npmPackageDependencies.includes(this.npmPackage.id)) {
          this.packageTitle.nativeElement.style.backgroundColor = '#fff';
        }
      });
  }

  ngOnDestroy(): void {
    if (this.npmPackageDependenciesSubscription) {
      this.npmPackageDependenciesSubscription.unsubscribe();
    }
    if (this.npmPackagesDependenciesChangedSubscription) {
      this.npmPackagesDependenciesChangedSubscription.unsubscribe();
    }
    if (this.npmPackagesResetBackgroundColorSubscription) {
      this.npmPackagesResetBackgroundColorSubscription.unsubscribe();
    }
  }

  /**
   * При наведении мышью на карточку npm пакета фон заголовка окрасится в светло-зеленый. Если локально данных о зависимостях нет, то отправляется запрос на получение его массива зависимостей, иначе берется из локального Map
   */
  @HostListener('mouseenter') onMouseEnter() {
    this.packageTitle.nativeElement.style.backgroundColor = '#a9ecbbad'; //light-green color
    if (
      !this.npmListManager.npmPackageDependenciesMap.has(this.npmPackage.id)
    ) {
      this.npmPackageDependenciesSubscription = this.npmListService
        .getNpmPackageDependencies(this.npmPackage.id)
        .subscribe();
    } else {
      this.npmListManager.npmPackagesDependenciesChanged.next(
        new NpmPackageDependencies(
          this.npmPackage.id,
          this.npmListManager.npmPackageDependenciesMap.get(this.npmPackage.id)
        )
      );
    }
  }

  /**
   * Когда мышь покинет пространство карточки цвет заголовка изменится на белый
   */
  @HostListener('mouseleave') onMouseLeave() {
    this.packageTitle.nativeElement.style.backgroundColor = '#fff';
    if (this.npmPackageDependencies.length) {
      this.npmListManager.npmPackageResetBackgroundColor.next(null);
    }
    if (this.npmPackageDependenciesSubscription) {
      this.npmPackageDependenciesSubscription.unsubscribe();
    }
  }
}
