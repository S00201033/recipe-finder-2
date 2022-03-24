import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecipeAPIService {
  private handleError(err: HttpErrorResponse) {
    console.log('RecipeAPIService: ' + err.message);
    return Observable.throw(err.message);
  }
  

  private _siteRecipeURL = "https://api.edamam.com/api/recipes/v2?type=public";
  private _recipeAppId = "&app_id=9a8dde49";
  private _recipeAppKey = "&app_key=b5be69c2f1ae6f0780d579c08d233dc1";

  constructor(private _http: HttpClient, public afs: AngularFirestore,) { }

  



  getRecipeData(recipeName): Observable<any> {
    return this._http.get<any>(this._siteRecipeURL + this._recipeAppId + this._recipeAppKey + '&q=' + recipeName)
      .pipe(
        tap(data => {
          console.log("recipeData/error" + JSON.stringify(data))
        }
        ),
        catchError(this.handleError)
      );
  }


  postRecipeToFirestore(name, image, ingredientLines: any) {
    var ingredients = [];

    ingredientLines.forEach(element => {
      ingredients.push(element);
    });

    var recipeData = {
      name: name,
      image: image,
      ingredients: ingredients
    }

    return this.afs.collection('recipes').add(recipeData);
  }



}
