import {Injectable, EventEmitter} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded: EventEmitter<any> = new EventEmitter();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.getIngredients());
  }

  addIngredients(newIngredients: Ingredient[]): void {
    newIngredients.forEach((newIngredient: Ingredient) => {
      let found = false;

      this.ingredients.forEach((ingredient: Ingredient) => {
        if (ingredient.name === newIngredient.name) {
          ingredient.amount += newIngredient.amount;
          found = true;
        }
      });

      if (!found) {
        this.ingredients.push({...newIngredient});
      }
    });

    this.ingredientAdded.emit(this.getIngredients());
  }
}
