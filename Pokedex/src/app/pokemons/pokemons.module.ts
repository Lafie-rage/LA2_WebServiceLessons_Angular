import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    PokemonListComponent
  ],
  exports: [
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    RouterModule
  ]
})
export class PokemonsModule { }
