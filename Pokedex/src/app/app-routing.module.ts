import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PokedexComponent} from "./pokemons/pokedex/pokedex.component";

/**
 * Defines the allowed routes and where they should redirect to.
 */
const routes: Routes = [
  {path: "", component: PokedexComponent, pathMatch: 'full'} // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
