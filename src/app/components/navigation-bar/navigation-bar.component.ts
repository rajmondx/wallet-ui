import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DesignService } from '../../services/design.service';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {

  /** is menu/navigation bar toggled */
  menuToggled = true;

  darkMode$: Observable<boolean> = this.designService.darkMode$;

  constructor(private designService: DesignService) {
  }

  ngOnInit(): void {
  }

  /** open/close navigation bar*/
  toggleMenu() {
    this.menuToggled = !this.menuToggled;
  }

  toggleDarkmode() {
    this.designService.toggleDarkmode();
  }
}
