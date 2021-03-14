import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';

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
  @Output()
  ingredientEventEmitter: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  addIngredient($event: Event): void {
    $event.preventDefault();

    const ingredient: Ingredient = new Ingredient(this.nameInput.nativeElement.value, +this.amountInput.nativeElement.value);

    this.ingredientEventEmitter.emit(ingredient);

    this.nameInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
  }
}
