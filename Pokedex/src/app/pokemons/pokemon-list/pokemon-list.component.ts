import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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

  isLoading = true

  @Output() onPokemonClickedEvent = new EventEmitter<number>()

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
    this.isLoading = true
    this.api.getPokemons(this.pokemons.length).subscribe(pokemons => {
      console.log(pokemons.data)
      this.pokemons = this.pokemons.concat(pokemons.data)
      this.isLoading = false
    })
  }

  /**
   * Callback when an item of the list is being clicked on.
   * Transmit the event and the id of the clicked item to the details view via the parent view.
   *
   * @param id The id of the clicked item.
   */
  onItemClicked(id: number) {
    this.onPokemonClickedEvent.emit(id)
  }

  /**
   * Callback when anything is type in the search input field.
   * Call the API with the provided query asking it for the list of items corresponding to this query.
   * If the query is a character sequence, in this case it will look for a name containing the provided query.
   * Otherwise, if it's a number, it will look for an item with the exact same id.
   * When the API response, it displays it to the view.
   * Also manage the loading status.
   *
   * @param query The query typed in the search input field.
   */
  searchPokemons(query: string): void {
    if (query.length > 0) {// Is not empty
      this.isLoading = true
      this.api.searchPokemons(query).subscribe(result => {
          this.pokemons = result.data
          this.isLoading = false
        }
      )
    } else {
      this.getPokemons()
    }
  }
}
