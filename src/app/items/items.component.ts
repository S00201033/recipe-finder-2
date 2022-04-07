import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/Item';
import { RecipeAPIService } from '../services/RecipeAPIService';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [{id:"1", name:'food',image: undefined}];
  editState: boolean = false;
  itemToEdit: Item;

  constructor(private itemService: ItemService, private recipesService: RecipeAPIService, public dialog: MatDialog) { }

  ngOnInit() {
    // this.itemService.getItems().subscribe(items => {
    //   // console.log("items ",items);
    //   // this.items = items;
    // });
    this.getRecipeList();
  }

  getRecipeList(){
    this.recipesService.getRecipesList().then(res => {
      console.log("rescip ", res)
      this.items = res
    })
  }

  deleteRecipe(id){
    this.recipesService.delRecipes(id).then(res => {
      let index = this.items.findIndex(x => x.id == id)
      this.items.splice(index,1)
      console.log("id del ",res)
      alert('Sucessfully Deleted Recipe')
    })
  }

  deleteItem(event, item: Item){
    this.clearState();
    this.itemService.deleteItem(item);
  }

  editItem(event, item: Item){
    this.editState = true;
    this.itemToEdit = item;
  }

  updateItem(item: Item){
    this.itemService.updateItem(item);
    this.clearState();
  }

  clearState(){
    this.editState = false;
    this.itemToEdit = null;
  }

  openDialog(item) {
    let dialogRef = this.dialog.open(EditModalComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe(cl => {
      console.log("modal close with ", cl)
    })
  }

}
