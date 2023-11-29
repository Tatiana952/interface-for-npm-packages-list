import { Component, OnInit } from '@angular/core';
import { NpmListService } from './core/npm-list-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public npmListService: NpmListService) {}

  ngOnInit(): void {
    this.npmListService.getNpmList().subscribe((res) => {
      console.log(res);
    });
  }
}
