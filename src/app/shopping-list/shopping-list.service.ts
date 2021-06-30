import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index): Ingredient {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index): void {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients);
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.getIngredients());
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

    this.ingredientChanged.next(this.getIngredients());
  }
}
