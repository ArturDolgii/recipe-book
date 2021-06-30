import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode: boolean;
  id: number;
  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = !!this.id;
      this.initForm();
    });
  }

  private initForm(): void {
    let name = '';
    let imagePath = '';
    let description = '';
    const ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;

      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern('^[1-9]+[0-9]*$')
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients
    });
  }

  getIngredients(): any {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit(): void {
    if (this.editMode) {
      this.updateRecipe();
    } else {
      this.addRecipe();
    }
  }

  cancel(): void {
    this.router.navigate(['/recipes', this.id]);
  }

  addIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[1-9]+[0-9]*$')
        ])
      })
    );
  }

  deleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  addRecipe(): void {
    const recipe: Recipe = this.createRecipe(this.recipeService.getNextId());
    this.recipeService.addRecipe(recipe);
    this.router.navigate(['/recipes']);
  }

  updateRecipe(): void {
    const recipe: Recipe = this.createRecipe(this.id);
    this.recipeService.updateRecipe(recipe);
    this.router.navigate(['/recipes', this.id]);
  }

  createRecipe(id: number): Recipe {
    return new Recipe(
      id,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
  }
}
