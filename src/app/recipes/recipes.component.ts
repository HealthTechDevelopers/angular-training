import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  chosenRecipe: Recipe

  constructor() { }

  ngOnInit() {
  }

  // onRecipeChoose(recipe: Recipe) {
  //   this.chosenRecipe = recipe
  // }

}
