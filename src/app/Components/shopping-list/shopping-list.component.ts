import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../../Model/ingredient.model';
import { ShoppingListService } from '../../Services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientAdded.subscribe((newIngredients: Ingredient[]) => {
      this.ingredients = newIngredients;
    });
  }

  onEditItem(index: number) {
    this.shoppingListService.editIngredient.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
