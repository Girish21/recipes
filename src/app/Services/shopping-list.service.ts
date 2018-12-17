import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../Model/ingredient.model';

@Injectable()
export class ShoppingListService {

  ingredientAdded: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  editIngredient: Subject<number> = new Subject<number>();

  ingredients: Ingredient[] = [];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredients(data: Ingredient[]) {
    this.ingredients.splice(0);
    this.ingredients.push(...data);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addIngredient(data: Ingredient) {
    this.ingredients.push(data);
    // console.log(this.ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  updateIngredient(data: Ingredient, index: number) {
    this.ingredients[index] = data;
    this.ingredientAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice());
  }

}
