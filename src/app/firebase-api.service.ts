import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Ingredient}  from './ingredient';
import { Observable} from 'rxjs';
import { retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  apiURL = 'https://us-central1-recipe-finder-549fd.cloudfunctions.net/';

  constructor(private http:HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'

  })
}
getIngredients():Observable<Ingredient> {
  return this.http.get<Ingredient>(this.apiURL + '/getIngredients')
  .pipe(
    retry(1),
    //catchError(this.handleError)
  )
}
addIngredient(title:string):Observable<Ingredient>{

  return this.http.post<Ingredient>(this.apiURL + '/addIngredient?title=' + title,null)
  .pipe(
    retry(1),
    //catchError(this.handleError)
  )

}
delIngredient(id:string): Observable<Ingredient> {
  return this.http.delete<Ingredient>(this.apiURL +'/deleteIngredient?id=' +id)
  .pipe(
    retry(1),

  )
}
  //handleError(error)
//{
//let errorMessage = '';
//if(error.error instanceof ErrorEvent) {
 // errorMessage = error.error.message;
//}// else {
 // errorMessage = `Error Code: ${error.status}\nMessage : ${error.message}`;
//}
//window.alert(errorMessage);
//return throwError(errorMessage);
 // }

}
