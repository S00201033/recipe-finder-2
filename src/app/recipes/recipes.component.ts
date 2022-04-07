import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeAPIService } from '../services/RecipeAPIService';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeAPIService]

})
export class RecipesComponent implements OnInit, AfterViewInit {
  errorMessage: any;

  recipeData: any;
  @ViewChild('recipeName') someInput!: ElementRef;
  param = ''

  constructor(private _recipeService: RecipeAPIService, private activeRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    document.body.className = "selector";

    this.activeRouter.queryParams.subscribe(param => {
      if(param.prop){
        this.getRecipeDetails(param.prop)
        this.param = param.prop

      }
    })
  }
  ngOnDestroy(){
    document.body.className="";
  }

  ngAfterViewInit(): void {
    this.someInput.nativeElement.value = this.param;
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