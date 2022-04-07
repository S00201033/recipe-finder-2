import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { RecipeAPIService } from "./services/RecipeAPIService";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AngularFireModule } from "@angular/fire";
import { environment } from 'src/environments/environment';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ItemsComponent } from './items/items.component';
import { ItemService } from './services/item.service';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';



@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    NutritionComponent,
    RecipesComponent,
    HomeComponent,
    ItemsComponent,
    EditModalComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    FormsModule,
     MatCardModule,
     MatButtonModule,
     MatDialogModule,
     MatFormFieldModule,
     MatInputModule



  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
