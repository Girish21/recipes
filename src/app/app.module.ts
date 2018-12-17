import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import {ShoppingListModule} from './Components/shopping-list/shopping-list.module';
import {SharedModule} from './Model/shared.module';

import { AppComponent } from './app.component';

import { AppRouter } from './app-routing.module';

import { RecipeService } from './Services/recipe.service';
import { ShoppingListService } from './Services/shopping-list.service';
import { RecipeDetailResolver } from './Services/recipe-details-resolver.service';
import {FirebaseDatabaseService} from './Services/firebaseDatabase.service';
import {AuthService} from './Services/auth.service';
import {AuthGuardService} from './Components/auth/auth-guard.service';
import {AuthModule} from './Components/auth/auth.module';
import {CoreModule} from './Components/core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRouter,
    CoreModule,
    ShoppingListModule,
    AuthModule,
    SharedModule
  ],
  providers: [RecipeService, ShoppingListService, RecipeDetailResolver,
    FirebaseDatabaseService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
