import { Component, Input, OnInit } from '@angular/core';
import { NpmPackage } from 'src/app/models/NpmPackage';

@Component({
  selector: 'app-npm-package',
  templateUrl: './npm-package.component.html',
  styleUrls: ['./npm-package.component.css'],
})
export class NpmPackageComponent implements OnInit {
  @Input() npmPackage: NpmPackage;

  public slashPosition: number;
  public npmPackageId: string[];

  constructor() {}

  ngOnInit(): void {
    this.slashPosition = this.npmPackage.id.indexOf('/');
    if (this.slashPosition !== -1) {
      this.npmPackageId = this.npmPackage.id.split('/');
    }
  }
}
