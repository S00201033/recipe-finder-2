import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RecipeAPIService } from '../services/RecipeAPIService';
import { FormsModule } from '@angular/forms';

export interface DialogData {
  id: string
  name: string
  image: string
  ingredients: []
}

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  recipe: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private recipeService: RecipeAPIService,
  public dialogRef: MatDialogRef<any>) {
    console.log("moda data ", data)
    this.recipe = data
  }

  ngOnInit(): void {
  }
  save(){
    this.recipeService.updateRecipe(this.data).then(res => {

    this.dialogRef.close(this.data)
    });
  }

}
