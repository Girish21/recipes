import { Ingredient } from './ingredient.model';

export class Recipe{
  public name: string;
  public description: string;
  public imgUrl: string;
  public ingredients: Ingredient[];

  constructor(desc: string, url: string, ingredients: Ingredient[], name: string) {
    this.name = name;
    this.description = desc;
    this.imgUrl = url;
    this.ingredients = ingredients;
  }
}
