import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {RouterModule} from "@angular/router";
import {InfiniteScrollModule} from "ngx-infinite-scroll";



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
    RouterModule,
    InfiniteScrollModule
  ]
})
export class PokemonsModule { }
