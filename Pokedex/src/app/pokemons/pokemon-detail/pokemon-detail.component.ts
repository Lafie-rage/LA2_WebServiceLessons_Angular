import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common"
import {PokemonDetails} from "../models/pokemon-details.model";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnChanges {
  pokemon: PokemonDetails | undefined;

  @Input() pokemonId: number | undefined

  constructor(private api: PokemonService, private route: ActivatedRoute, private location: Location) {
  }

  /**
   * Callback when the view is initialized.
   */
  ngOnInit(): void {
  }

  /**
   * Callback when the view is changed/reload.
   * Call the API in order to get the item to display.
   * When the API respond, displays the item on the view.
   */
  ngOnChanges(): void {
    this.getPokemon()
  }

  /**
   * Call the API to retrieve the asked item.
   * This item is retrieved by its ID which is provided via the URL param "id".
   * When the API respond, display the item on the view.
   *
   * @private
   */
  private getPokemon() {
    console.log(this.pokemonId)
    if(this.pokemonId != null) {
      this.api.getPokemon(this.pokemonId).subscribe(pokemon => this.pokemon = pokemon)
    }
  }

  /**
   * Callback when the back button is clicked on.
   * Get back to the previous page.
   */
  goBack() {
    this.location.back()
  }

  /**
   * Callback when the item associated sound must be played.
   * Retrieve the sound and plays it.
   * The sound is retrieve by the item id.
   */
  playAudio() {
    const audio = new Audio();
    audio.src = `../../assets/audio/${this.pokemon?.id}.mp3`
    audio.play();
  }
}
