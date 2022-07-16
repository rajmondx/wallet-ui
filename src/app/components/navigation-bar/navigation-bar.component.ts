import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {

  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  menuToggled = true;

  constructor(private darkModeService: DarkModeService) {
  }


  ngOnInit() {
    this.darkModeService.disable();
    //this.darkMode();
  }

  /*darkMode() {
    // set light or dark mode according to user setting
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkModeService.enable();
    } else {
      this.darkModeService.disable();
    }
    // change mode when settings change
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const newColorScheme = event.matches ? 'dark' : 'light';
      if (newColorScheme === 'dark') {
        this.darkModeService.enable();
      } else {
        this.darkModeService.disable();
      }
    });
  }*/

  toggleMenu() {
    this.menuToggled = !this.menuToggled;
  }

  toggleDarkmode() {
    //this.darkModeService.toggle();
  }

}
