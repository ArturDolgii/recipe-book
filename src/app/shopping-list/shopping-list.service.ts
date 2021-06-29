import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded: Subject<Ingredient[]> = new Subject<Ingredient[]>();

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
    this.ingredientAdded.next(this.getIngredients());
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

    this.ingredientAdded.next(this.getIngredients());
  }
}
