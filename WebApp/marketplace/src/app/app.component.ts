import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMobile = false;

  toggleMobileNav() {
    this.isMobile = !this.isMobile;
  }
}
