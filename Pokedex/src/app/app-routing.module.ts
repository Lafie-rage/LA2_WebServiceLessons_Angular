import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PokemonDetailComponent} from "./pokemons/pokemon-detail/pokemon-detail.component";
import {PokemonListComponent} from "./pokemons/pokemon-list/pokemon-list.component";
import {PokedexComponent} from "./pokemons/pokedex/pokedex.component";

/**
 * Defines the allowed routes and where they should redirect to.
 */
const routes: Routes = [
  {path: 'pokemons', component: PokemonListComponent},
  {path: 'pokemons/:id', component: PokemonDetailComponent},
  {path: "", component: PokedexComponent, pathMatch: 'full'} // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
