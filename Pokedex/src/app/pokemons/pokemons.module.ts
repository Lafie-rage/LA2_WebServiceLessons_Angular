import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {RouterModule} from "@angular/router";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {PokedexComponent} from './pokedex/pokedex.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {PokemonDetailComponent} from "./pokemon-detail/pokemon-detail.component";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PokedexTeamComponent} from './pokedex-team/pokedex-team.component';
import {PokedexTeamListComponent} from './pokedex-team-list/pokedex-team-list.component';
import {DialogRemovePokemon} from "./pokedex-team-list/dialog/dialog-remove-pokemon";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogAddPokemon} from "./pokedex/dialog/dialog-add-pokemon";


@NgModule({
  declarations: [
    PokemonListComponent,
    PokedexComponent,
    PokemonDetailComponent,
    PokedexTeamComponent,
    PokedexTeamListComponent,
    DialogRemovePokemon,
    DialogAddPokemon,
  ],
  exports: [
    PokemonListComponent,
    PokedexComponent,
    PokemonDetailComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    RouterModule,
    InfiniteScrollModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ]
})
export class PokemonsModule {
}
