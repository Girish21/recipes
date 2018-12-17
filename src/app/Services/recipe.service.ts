import { Injectable } from '@angular/core';

import { Recipe } from '../Model/recipe.model';
import { Ingredient } from '../Model/ingredient.model';

import { ShoppingListService } from './shopping-list.service';
import {Subject} from 'rxjs/Subject';
import {FirebaseDatabaseService} from './firebaseDatabase.service';
import {Response} from '@angular/http';

@Injectable()
export class RecipeService {

  recipeChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService, private firebase: FirebaseDatabaseService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipesFromDatabase() {
    this.firebase.getFromDatabase().subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
      }
    );
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeChanged.next(this.recipes);
  }

  saveRecipe() {
    this.firebase.saveToDatabase(this.recipes).subscribe(
      (response: Response) => {
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clearRecipes() {
    this.recipes = [];
    this.recipeChanged.next(this.recipes.slice());
  }

}

