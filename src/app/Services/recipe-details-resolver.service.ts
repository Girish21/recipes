import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { RecipeService } from './recipe.service';
import { Recipe } from '../Model/recipe.model';

@Injectable()
export class RecipeDetailResolver implements Resolve<Recipe> {

  constructor(private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
      return this.recipeService.getRecipe(+route.params['id']);
    }

}
