import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {Pokemon} from "../models/pokemon-details.model";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private api: PokemonService) {
  }

  ngOnInit(): void {
    this.api.getPokemons().subscribe(pokemons => this.pokemons = pokemons.data)
  }

  onScroll() {
    
  }
}
