import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { RecipeAPIService } from "./services/RecipeAPIService";

import { AngularFireModule } from "@angular/fire";
import { environment } from 'src/environments/environment';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    NutritionComponent,
    RecipesComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    FormsModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
