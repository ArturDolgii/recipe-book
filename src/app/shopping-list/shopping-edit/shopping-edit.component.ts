import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput')
  nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput')
  amountInput: ElementRef<HTMLInputElement>;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  addIngredient($event: Event): void {
    $event.preventDefault();

    const ingredient: Ingredient = new Ingredient(this.nameInput.nativeElement.value, +this.amountInput.nativeElement.value);

    this.shoppingListService.addIngredient(ingredient);

    this.nameInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
  }
}
