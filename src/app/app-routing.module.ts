import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsComponent } from '../app/ingredients/ingredients.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'nutrition', component: NutritionComponent }


];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
