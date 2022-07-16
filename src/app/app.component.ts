import { Component, HostBinding, OnInit } from '@angular/core';
import { DesignService } from './services/design.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'wallet-ui';

  /** class has to be changed a root component otherwise css for dark doesnt load properly */
  @HostBinding('class') activeThemeCssClass: string | undefined;

  constructor(private designService: DesignService) {
  }

  ngOnInit() {
    this.designService.start(this);
  }
}
