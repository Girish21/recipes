import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../../Services/recipe.service';
import {AuthService} from '../../../Services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private recipeService: RecipeService, private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  saveToDatabase() {
    this.recipeService.saveRecipe();
  }

  fetchFromDatabase() {
    this.recipeService.getRecipesFromDatabase();
  }

  authenticated() {
    return this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout();
    this.recipeService.clearRecipes();
    this.router.navigate(['/recipes']);
  }

}
