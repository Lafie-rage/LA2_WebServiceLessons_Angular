import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PokedexComponent} from "./pokemons/pokedex/pokedex.component";
import {LoginComponent} from "./authentication/login/login.component";
import {PokedexTeamComponent} from "./pokemons/pokedex-team/pokedex-team.component";

/**
 * Defines the allowed routes and where they should redirect to.
 */
const routes: Routes = [
  {path: "", component: PokedexTeamComponent, pathMatch: 'full'}, // Default route
  {path: "login", component: LoginComponent},
  {path: "list", component: PokedexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
