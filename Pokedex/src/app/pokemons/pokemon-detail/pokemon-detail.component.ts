import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common"
import {Pokemon, PokemonDetails} from "../models/pokemon-details.model";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  /**
   * Represent the current shown item.
   */
  pokemon: PokemonDetails | undefined;

  constructor(private api: PokemonService, private route: ActivatedRoute, private location: Location) {
  }

  /**
   * Callback when the view is initialized.
   * Call the API in order to get the item to display.
   * When the API respond, displays the item on the view.
   */
  ngOnInit(): void {
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
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.api.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon)
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
