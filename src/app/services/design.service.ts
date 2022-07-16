import { Injectable } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { OverlayContainer } from '@angular/cdk/overlay';

/**
 * Had to use 2 different dark mode packages:
 * - 1. angular-dark-mode
 * - 2. angular-material-dynamic-themes
 */

const THEME_DARKNESS_SUFFIX = '-dark';

@Injectable({
  providedIn: 'root',
})
export class DesignService {

  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;

  // @ts-ignore
  private rootComponent: AppComponent;
  isThemeDark = false
  activeTheme: string | undefined;

  constructor(private darkModeService: DarkModeService, private overlayContainer: OverlayContainer) {
  }

  /**
   * Start theming/design/darkmode/lightmode etc.
   * @param rootComponent Need access to {@link AppComponent.activeThemeCssClass}
   */
  start(rootComponent: AppComponent) {
    this.rootComponent = rootComponent;
    this.darkMode();
  }

  darkMode() {
    // set light or dark mode according to user setting
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkModeService.enable();
      this.setActiveTheme('deeppurple-amber', /* darkness: */ true)
    } else {
      this.darkModeService.disable();
      this.setActiveTheme('deeppurple-amber', /* darkness: */ false)
    }
    // change mode when settings change
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const newColorScheme = event.matches ? 'dark' : 'light';
      if (newColorScheme === 'dark') {
        this.darkModeService.enable();
        this.setActiveTheme('deeppurple-amber', /* darkness: */ true)
      } else {
        this.darkModeService.disable();
        this.setActiveTheme('deeppurple-amber', /* darkness: */ false)
      }
    });
  }


  setActiveTheme(theme: string, darkness: boolean) {
    this.activeTheme = theme

    const cssClass = darkness ? theme + THEME_DARKNESS_SUFFIX : theme;

    const classList = this.overlayContainer.getContainerElement().classList
    if (classList.contains(<string>this.rootComponent.activeThemeCssClass)) {}
    if (typeof this.rootComponent.activeThemeCssClass === 'string') {
      classList.replace(this.rootComponent.activeThemeCssClass, cssClass)
    } else {
      classList.add(cssClass)
    }

    this.rootComponent.activeThemeCssClass = cssClass
    this.isThemeDark = darkness;
  }

  toggleDarkmode() {
    if (!this.isThemeDark) {
      this.darkModeService.enable();
      this.setActiveTheme('deeppurple-amber', /* darkness: */ true);
    } else {
      this.darkModeService.disable();
      this.setActiveTheme('deeppurple-amber', /* darkness: */ false);
    }
  }
}
