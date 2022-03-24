import {Component, OnInit} from '@angular/core';
import {Pokemon} from "../models/pokemon-details.model";
import {PokemonService} from "../services/pokemon.service";
import {forkJoin, mergeMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogRemovePokemon} from "./dialog/dialog-remove-pokemon";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pokedex-team-list',
  templateUrl: './pokedex-team-list.component.html',
  styleUrls: ['./pokedex-team-list.component.scss']
})
export class PokedexTeamListComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.retrievePokemonList()
  }

  /**
   * Callback when the remove button is clicked.
   * Display and observe a dialog asking the user if he is sure to remove the pokemon from its team.
   *
   * @param position The pokemon position in its team.
   */
  onRemoveButtonClicked(position: number) {
    this.displayAndObserveRemoveDialog(position)
  }

  /**
   * Callback when the add button is clicked.
   * Redirect the user to the choosing list view.
   */
  onAddButtonClick() {
    this.router.navigateByUrl('list')
  }

  /**
   * Retrieve the pokemons of the user team.
   * When it is retrieved, update the view.
   *
   * @private
   */
  private retrievePokemonList() {
    // Based on https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin
    this.pokemonService.getPokemonTeam().pipe(mergeMap(pokemonsId =>
      forkJoin(
        ...pokemonsId.map(id =>
          this.pokemonService.getPokemon(id)
        )
      )
    )).subscribe(pokemons => {
      this.pokemons = pokemons.map(item => {
          return <Pokemon>item
        }
      )
    })
  }

  /**
   * Display and observe a dialog that ask the user if he is sure to remove the selected pokemon from its team.
   * If he clicks the delete button, the pokemon will be delete.
   * Otherwise, it won't be.
   *
   * @param position The position of the pokemon to remove from the team
   * @private
   */
  private displayAndObserveRemoveDialog(position: number) {
    const dialogRef = this.dialog.open(DialogRemovePokemon, {
      width: "40vh"
    })

    dialogRef.afterClosed().subscribe(isRemoveConfirmed => {
      if (isRemoveConfirmed) {
        this.pokemons = this.pokemons.filter((_, index) => {
          return index != position
        })
        this.pokemonService.updatePokemonTeam(
          this.pokemons.map(pokemon => pokemon.id)
        ).subscribe()
      }
    })
  }
}
