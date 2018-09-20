import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipesService } from '../services/recipes.service';
import { ShoppingListService } from '../services/shopping-list.service';
import { Recipe } from '../shared/recipe.model'
import { Ingredient } from '../shared/ingredient.model'
import { map } from 'rxjs/operators'
import { AuthService } from "./auth.service";

@Injectable()

export class RequestsService {

    constructor(private http: Http, private shoppingsService: ShoppingListService, private recipesService: RecipesService, private authService: AuthService) {}

    updateData() {
        const token = this.authService.getToken()
        const recipes = this.recipesService.getRecipes()
        const shoppings = this.shoppingsService.getIngredients()
        return this.http.put('https://ng-project-999a1.firebaseio.com/data.json?auth=' + token, {
            recipes: recipes,
            shoppings: shoppings
        })
    }

    fetchData() {
        const token = this.authService.getToken()
        return this.http.get('https://ng-project-999a1.firebaseio.com/data.json?auth=' + token).pipe(
            map(
                (response: Response) => {
                    const data: {shoppings: Ingredient[], recipes: Recipe[]} = response.json()
                    const recipes: Recipe[] = data.recipes
                    const shoppings: Ingredient[] = data.shoppings
                    for(let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = []
                        }
                    }
                    return {recipes, shoppings}
                }
            )
        ).subscribe(
            ({recipes, shoppings}) => {
                this.shoppingsService.updateAllIngredients(shoppings)
                this.recipesService.updateAllRecipes(recipes)
                return {recipes, shoppings}
            }
        )
    }

}