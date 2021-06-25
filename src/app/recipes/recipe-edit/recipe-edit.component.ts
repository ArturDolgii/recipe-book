import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  editMode: boolean;

  constructor(private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const recipeId = +params['id'];

      this.editMode = !!recipeId;

      if (this.editMode) {
        this.recipe = {...this.recipeService.getRecipe(recipeId)};
      } else {
        this.recipe = new Recipe(-1, '', '', '', [new Ingredient('', 0)]);
        this.changeToRandomImage();
      }
    });
  }

  save(): void {
    if (this.editMode) {
      this.updateRecipe();
    } else {
      this.addRecipe();
    }
  }

  addRecipe(): void {
    this.recipeService.addRecipe(this.recipe);
    this.router.navigate(['/recipes']);
  }

  updateRecipe(): void {
    this.recipeService.updateRecipe(this.recipe);
    this.router.navigate(['/recipes', this.recipe.id]);
  }

  addIngredient(): void {
    this.recipeService.addIngredient(this.recipe);
  }

  deleteIngredient(index: number): void {
    this.recipeService.deleteIngredient(this.recipe, index);
  }

  changeToRandomImage(): void {
    this.recipe.imagePath = 'https://picsum.photos/500?r=' + Date.now();
  }
}
