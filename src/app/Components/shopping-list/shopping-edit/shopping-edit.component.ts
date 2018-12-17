import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { ShoppingListService } from '../../../Services/shopping-list.service';
import { Ingredient } from '../../../Model/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form') form: NgForm;

  subscription: Subscription;

  ingredient: Ingredient;

  editMode = false;
  editItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.editIngredient.subscribe(
      (val: number) => {
        // console.log(val);
        this.editMode = true;
        this.editItemIndex = val;
        this.ingredient = this.shoppingListService.getIngredient(this.editItemIndex);
        this.form.form.patchValue({
          'name': this.ingredient.name,
          'amount': this.ingredient.amount
        });
      }
    );
  }

  addIngredient() {
    const value = this.form.value;
    this.ingredient = new Ingredient(value.name, value.amount);
    if (!this.editMode) {
      this.shoppingListService.addIngredient(this.ingredient);
    } else {
      this.shoppingListService.updateIngredient(this.ingredient, this.editItemIndex);
    }
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.form.reset();
    this.editMode = false;
  }

  onClear() {
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
