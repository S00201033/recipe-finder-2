import { Component, OnInit } from '@angular/core';
import { FirebaseApiService } from '../firebase-api.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  title = 'Ingredient';
  MyIngredients: any=[];
  titleValue='';


  constructor(public firebaseApiService: FirebaseApiService){
    
  }
  ngOnInit(){
this.loadIngredients();
  }

  loadIngredients() {
    return this.firebaseApiService.getIngredients().subscribe((data: {})  =>{
      this.MyIngredients=data;
      this.titleValue='';
    })
  }
  addIngredient() 
  {
    return this.firebaseApiService.addIngredient(this.titleValue).subscribe((data: {}) => {
      this.MyIngredients=data;
      this.titleValue='';
    })
  }
  deleteIngredient(id:string) 
  {
    return this.firebaseApiService.delIngredient(id).subscribe((data: {}) => {
      this.MyIngredients = data;
    })
  }


}
