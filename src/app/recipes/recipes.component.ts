import { Component, OnInit } from '@angular/core';
import { RecipeAPIService } from '../services/RecipeAPIService';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeAPIService]

})
export class RecipesComponent {
  errorMessage: any;

  recipeData: any;

  constructor(private _recipeService: RecipeAPIService) {
  }
 
  

  getRecipeDetails(recipeName: string): boolean {
    this._recipeService.getRecipeData(recipeName).subscribe(
      recipeData => {
        if (recipeData.hits != null)
          if (recipeData.hits.length > 0) {
            this.recipeData = recipeData.hits[0];
            this._recipeService.postRecipeToFirestore(this.recipeData.recipe.label, this.recipeData.recipe.image, this.recipeData.recipe.ingredientLines);
          }
      },
      error => this.errorMessage = <any>error
    );
    return false;
  }
}
