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
  pokemon: PokemonDetails | undefined;

  constructor(private api: PokemonService, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit(): void {
    this.getPokemon()
  }

  getPokemon() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    console.log(id)
    this.api.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon)
  }

  goBack() {
    this.location.back()
  }

  playAudio() {
    const audio = new Audio();
    audio.src = `../../assets/audio/${this.pokemon?.id}.mp3`
    audio.play();
  }
}
