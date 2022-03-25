import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Book}  from './book';
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
getBooks():Observable<Book> {
  return this.http.get<Book>(this.apiURL + '/getBooks')
  .pipe(
    retry(1),
    //catchError(this.handleError)
  )
}
addBook(title:string , quantity:string):Observable<Book>{

  return this.http.post<Book>(this.apiURL + '/addBook?title=' + title + '&quantity=' +quantity,null)
  .pipe(
    retry(1),
    //catchError(this.handleError)
  )

}
delBook(id:string): Observable<Book> {
  return this.http.delete<Book>(this.apiURL +'/deleteBook?id=' +id)
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
