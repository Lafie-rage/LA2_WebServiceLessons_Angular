import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

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


  onPokemonSelected(pokemonId: number) {
    this.selectedPokemon = pokemonId
  }
}
