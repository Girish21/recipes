import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuardService} from '../auth/auth-guard.service';
import {RecipeDetailResolver} from '../../Services/recipe-details-resolver.service';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeComponent} from './recipe.component';

const recipeRoutes: Routes = [
  {
    path: '',
    component: RecipeComponent,
    children: [
      {
        path: '',
        component: RecipeStartComponent
      },
      {
        path: 'new',
        component: RecipeEditComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: {recipe: RecipeDetailResolver},
        canActivate: [AuthGuardService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: {recipe: RecipeDetailResolver},
        canActivate: [AuthGuardService]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
