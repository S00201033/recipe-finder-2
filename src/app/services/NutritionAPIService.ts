import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NutritionAPIService {
  private handleError(err: HttpErrorResponse) {
    console.log('NutritionAPIService: ' + err.message);
    return Observable.throw(err.message);
  }
  

  private _siteRecipeURL = "https://api.edamam.com/api/nutrition-data?type=public";
  private _recipeAppId = "&app_id=69319fb7";
  private _recipeAppKey = "&app_key=598f89606b6a75293f9adb176c62bb24";

  constructor(private _http: HttpClient, public afs: AngularFirestore,) { }

  



  getNutritinData(recipeName): Observable<any> {
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

    return this.afs.collection('nutrition').add(recipeData);
  }



}
