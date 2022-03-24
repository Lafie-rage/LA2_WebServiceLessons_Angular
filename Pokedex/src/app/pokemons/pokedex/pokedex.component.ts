import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogAddPokemon} from "./dialog/dialog-add-pokemon";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {PokemonService} from "../services/pokemon.service";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  selectedPokemon: number | undefined

  constructor(private dialog: MatDialog, private router: Router, private cookieService: CookieService, private pokemonService: PokemonService) {
  }

  /**
   * Callback when the view is initialized.
   * Verify that the user is authenticated otherwise, redirect him to the login page.
   */
  ngOnInit(): void {
    const token = {
      access_token: this.cookieService.get("JWT_TOKEN_ACCESS"),
      refresh_token: this.cookieService.get("JWT_TOKEN_REFRESH"),
      expires_at: this.cookieService.get("JWT_TOKEN_EXPIRES_AT"),
    }

    if (token.access_token === undefined ||
      token.access_token.length === 0 ||
      Date.parse(token.expires_at) < Date.now()) {
      // If there is no token saved, or it has expired, we must ask the user to reconnect
      this.router.navigateByUrl('login')
    }
  }

  /**
   * Callback when an item of the list is being clicked on.
   * Transmit the id of the clicked item to the details view.
   *
   * @param pokemonId The id of the clicked item.
   */
  onPokemonSelected(pokemonId: number) {
    this.selectedPokemon = pokemonId
  }

  /**
   * Callback when the add button is clicked on.
   * Display a dialog asking for the user if he is sure to add the selected pokemon.
   */
  onAddButtonClick() {
    this.displayAndObserveAddDialog()
  }

  /**
   * Display the add dialog and observe its result.
   * This dialog ask for the user if he is sure to add the selected pokemon.
   * By clicking confirm, the pokemon will be added ot its team and the user will be redirected to its team view.
   * By clicking cancel, the pokemon won't be added and the user will stay on this view.
   *
   * @private
   */
  private displayAndObserveAddDialog() {
    const dialogRef = this.dialog.open(DialogAddPokemon, {
      width: "40vh",
      data: this.selectedPokemon
    })

    dialogRef.afterClosed().subscribe(isAddConfirmed => {
      if (isAddConfirmed) {
        this.addPokemonToTeam()
      }
    })
  }

  /**
   * Add the selected pokemon to the user team then redirect him to its team view.
   *
   * @private
   */
  private addPokemonToTeam() {
    this.pokemonService.getPokemonTeam().subscribe(pokemonsId => {
      pokemonsId.push(<number>this.selectedPokemon)
      this.pokemonService.updatePokemonTeam(pokemonsId).subscribe(_ => {
        this.router.navigate(["/"])
      })
    })
  }
}
