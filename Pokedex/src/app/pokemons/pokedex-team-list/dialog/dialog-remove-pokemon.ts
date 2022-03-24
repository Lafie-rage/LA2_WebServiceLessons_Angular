import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PokemonDetails} from "../../models/pokemon-details.model";

@Component({
  selector: 'dialog-remove-pokemon',
  templateUrl: 'dialog-remove-pokemon.html',
})
export class DialogRemovePokemon {
  constructor(
    public dialogRef: MatDialogRef<DialogRemovePokemon>,
    @Inject(MAT_DIALOG_DATA) public pokemon: PokemonDetails,
  ) {
  }
}
