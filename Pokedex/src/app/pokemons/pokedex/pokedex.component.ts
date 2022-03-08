import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  selectedPokemon : number | undefined

  constructor() { }

  ngOnInit(): void {
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
}
