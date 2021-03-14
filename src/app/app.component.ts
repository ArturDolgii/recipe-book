import {Component} from '@angular/core';
import {MenuItems} from './shared/menuItems';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuItems = MenuItems;
  activeMenuItem: MenuItems = MenuItems.recipes;

  onMenuClicked(menuItem: MenuItems): void {
    this.activeMenuItem = menuItem;
  }
}
