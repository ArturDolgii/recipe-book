import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(1,
      'A Test Recipe',
      'This is simple description',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(2,
      'A Test Recipe 2',
      'This is simple description 2',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  getRecipe(id: number): Recipe {
    return this.recipes.find((recipe: Recipe) => recipe.id === id);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(recipe: Recipe): void {
    const index = this.recipes.findIndex((item: Recipe) => item.id === recipe.id);
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(recipe): void {
    this.recipes = [...this.recipes.filter((item: Recipe) => item.id !== recipe.id)];
    this.recipesChanged.next(this.recipes.slice());
  }

  getNextId(): number {
    return this.recipes.length ? this.recipes.slice(-1)[0].id + 1 : 1;
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }
}
