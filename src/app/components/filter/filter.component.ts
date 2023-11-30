import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NpmListManagerService } from 'src/app/core/npm-list-manager.service';
import { NpmListService } from 'src/app/core/npm-list-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnDestroy {
  @Input() npmPackageId: string;

  private npmPackagesSubscription: Subscription;

  constructor(
    private npmListManagerService: NpmListManagerService,
    private npmListService: NpmListService
  ) {}

  ngOnDestroy(): void {
    if (this.npmPackagesSubscription) {
      this.npmPackagesSubscription.unsubscribe();
    }
  }

  public onKey($event) {
    this.npmListManagerService.npmPackageID.next($event.target.value);
  }

  public onClick() {
    this.npmPackageId = '';
    this.npmPackagesSubscription = this.npmListService
      .getNpmPackagesList()
      .subscribe();
  }
}
