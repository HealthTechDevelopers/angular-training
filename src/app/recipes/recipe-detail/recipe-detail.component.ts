import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe.model'
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe
  id: number

  constructor(private recipesService: RecipesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.recipe = this.recipesService.getChosenRecipe(this.id)
      }
    )
  }

  onAddToList() {
    this.recipesService.addIngToList(this.recipe.ingredients)
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }

}
