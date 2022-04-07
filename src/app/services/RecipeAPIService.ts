import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';


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


  getRecipesList() {
    let petitions: any[] = []
    return firebase.firestore().collection('recipes').get().then((resp) => {
      resp.forEach(e => {
        petitions.push({...e.data(), id: e.id})
      })
      return petitions
    }).catch(err => err)
  }


  delRecipes(id) {
    return firebase.firestore().collection('recipes').doc(id).delete().then((resp) => {
      console.log("deleted id ",resp)
      return resp
    }).catch(err => console.log("failed to del ",err))
  }

  updateRecipe(recipe) {
    return firebase.firestore().collection('recipes').doc(recipe.id).set(recipe).then((resp) => {
      resp
    }).catch(err => err)
  }


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
    const data = {
      [name]: {image}
    };


    var recipeData = {
      name: name,
      image: image,
      ingredients: ingredients
    }

    return this.afs.collection('recipes').add(recipeData);

  }



}
