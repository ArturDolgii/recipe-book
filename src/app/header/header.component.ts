import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MenuItems} from '../shared/menuItems';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output()
  menuClicked: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  menuItem: MenuItems;

  menuItems = MenuItems;

  switchContent(menuItem: MenuItems): void {
    this.menuItem = menuItem;
    this.menuClicked.emit(menuItem);
  }
}
