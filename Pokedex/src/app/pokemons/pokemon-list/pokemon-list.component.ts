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
    this.api.getPokemons().subscribe(pokemons => this.pokemons = pokemons.data)
  }

  /**
   * Callback when the view is scrolled. Actually does nothing at the moment.
   */
  onScroll() {
  }
}
