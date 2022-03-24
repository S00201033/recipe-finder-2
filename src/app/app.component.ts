import { Component } from '@angular/core';
import { RecipeAPIService } from "./services/RecipeAPIService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  
  errorMessage: any;

  recipeData: any;

  constructor() {
  }

  

  
}
