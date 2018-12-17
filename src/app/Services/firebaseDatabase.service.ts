import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Recipe} from '../Model/recipe.model';

import 'rxjs/Rx';
import {AuthService} from './auth.service';

@Injectable()
export class FirebaseDatabaseService {

  token = '';

  constructor(private http: Http, private auth: AuthService) { }

  saveToDatabase(recipes: Recipe[]) {
    this.token = this.auth.getToken();
    return this.http.put('https://angular-app-30cbd.firebaseio.com/recipe.json?auth=' + this.token, recipes);
  }

  getFromDatabase() {
    this.token = this.auth.getToken();
    return this.http.get('https://angular-app-30cbd.firebaseio.com/recipe.json?auth=' + this.token)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          // console.log(recipes);
          recipes.forEach(
            (recipe) => {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
          );
          return recipes;
        }
      );
  }

}
