import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { throwError } from 'rxjs';

import { ElectricityService } from '../../../@core/data/electricity.service';

@Component({
  selector: 'ngx-electricity',
  styleUrls: ['./electricity.component.scss'],
  templateUrl: './electricity.component.html',
})
export class ElectricityComponent implements OnDestroy {

  data: any;

  type = 'week';
  types = ['week', 'month', 'year'];

  currentTheme: string;
  themeSubscription: any;

  constructor(private eService: ElectricityService, private themeService: NbThemeService) {
    this.eService.getData().subscribe(
      data => {
        this.data = data;
      },
      err => {
        console.error('Error saving electric data!');
        return throwError(err);
      },
    );

    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
