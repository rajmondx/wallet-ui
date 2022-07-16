import { Component, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

const THEME_DARKNESS_SUFFIX = '-dark';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wallet-ui';
  @HostBinding('class') activeThemeCssClass: string | undefined;
  isThemeDark = false
  activeTheme: string | undefined;

  constructor(private overlayContainer: OverlayContainer) {
    // Set default theme here:
    this.setActiveTheme('deeppurple-amber', /* darkness: */ true)
  }

  setActiveTheme(theme: string, darkness: boolean | null = null) {
    if (darkness === null)
      darkness = this.isThemeDark
    else if (this.isThemeDark === darkness) {
      if (this.activeTheme === theme) return
    } else
      this.isThemeDark = darkness

    this.activeTheme = theme

    const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme

    const classList = this.overlayContainer.getContainerElement().classList
    if (classList.contains(<string>this.activeThemeCssClass))
      if (typeof this.activeThemeCssClass === 'string') {classList.replace(this.activeThemeCssClass, cssClass)} else
        classList.add(cssClass)

    this.activeThemeCssClass = cssClass
  }

  toggleDarkness() {
    this.setActiveTheme(<string>this.activeTheme, !this.isThemeDark)
  }
}
