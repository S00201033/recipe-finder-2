import { Component, OnInit } from '@angular/core';
import { FirebaseApiService } from 'src/app/firebase-api-service';
import { RecipeAPIService } from '../services/RecipeAPIService';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  title = 'Book';
  MyBooks: any=[];
  titleValue='';
  quantityValue='';
  errorMessage: any;

  recipeData: any;


  constructor(public firebaseApiService: FirebaseApiService,private _recipeService: RecipeAPIService){
    
  }
  ngOnInit(){
this.loadBooks();
  }

  loadBooks() {
    return this.firebaseApiService.getBooks().subscribe((data: {})  =>{
      this.MyBooks=data;
      this.titleValue='';
      this.quantityValue='';
    })
  }
  addBook() 
  {
    return this.firebaseApiService.addBook(this.titleValue,this.quantityValue).subscribe((data: {}) => {
      this.MyBooks=data;
      this.titleValue='';
      this.quantityValue='';
    })
  }
  deleteBook(id:string) 
  {
    return this.firebaseApiService.delBook(id).subscribe((data: {}) => {
      this.MyBooks = data;
    })
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

