import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import { Recipe } from '../../../Model/recipe.model';
import {RecipeService} from '../../../Services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  id: number;
  editMode = false;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = (params['id'] != null);
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      this.recipe = this.recipeService.getRecipe(this.id);
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imgUrl;
      recipeDescription = this.recipe.description;
      if (this.recipe['ingredients']) {
        this.recipe.ingredients.forEach(ingredient => {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        });
        // console.log(recipeIngredients.controls);
      }
    }
    this.form = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imageUrl': new FormControl(recipeImagePath, Validators.required),
      'recipeDescription': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
    // console.log(this.form);
  }

  addNewRecipe() {
    this.recipe = new Recipe(this.form.value.recipeDescription,
      this.form.value.imageUrl, this.form.value.ingredients, this.form.value.name);
    // console.log(this.recipe);
  }

  addNewIngredient() {
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  removeIngredient(index: number) {
    // console.log(index);
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    this.addNewRecipe();
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipe);
    } else {
      this.recipeService.addRecipe(this.recipe);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
