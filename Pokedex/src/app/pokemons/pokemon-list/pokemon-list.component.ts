import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {Pokemon} from "../models/pokemon-details.model";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  /**
   * The list of item displayed on the view
   */
  pokemons: Pokemon[] = [];

  constructor(private api: PokemonService) {
  }

  /**
   * Callback when the view is initialized.
   * Call the API in order to get the list of items to display.
   * When the API respond, displays the list on the view.
   */
  ngOnInit(): void {
    this.getPokemons()
  }

  /**
   * Callback when the view is scrolled. Actually does nothing at the moment.
   */
  onScroll() {
    this.getPokemons()
  }

  /**
   * Retrieve items from the API depending on the current size of the item list displayed.
   * When API respond, the list is updated adding new retrieved item to the current list.
   */
  getPokemons() {
    this.api.getPokemons(this.pokemons.length).subscribe(pokemons => {
      console.log(pokemons.data)
      this.pokemons = this.pokemons.concat(pokemons.data)
    })
  }
}
