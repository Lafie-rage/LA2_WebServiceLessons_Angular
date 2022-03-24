import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'dialog-add-pokemon',
  templateUrl: 'dialog-add-pokemon.html',
})
export class DialogAddPokemon {
  constructor(
    public dialogRef: MatDialogRef<DialogAddPokemon>
  ) {
  }
}
