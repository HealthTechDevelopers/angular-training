import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'

import { RecipesComponent } from './recipes.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGuard } from '../auth/auth-guard.service'

const recipesRoutes: Routes = [
    {path: '', component: RecipesComponent, children: [
        {path: '', component: RecipeStartComponent},
        {path: 'new', component: RecipeFormComponent, canActivate: [AuthGuard]},
        {path: ':id', component: RecipeDetailComponent},
        {path: ':id/edit', component: RecipeFormComponent, canActivate: [AuthGuard]}
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class RecipesRoutingModule {}