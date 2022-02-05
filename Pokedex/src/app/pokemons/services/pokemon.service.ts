import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {MessagesService} from "../../messages/services/message.service";
import {PagedData} from "../../common/paged-data";
import {Pokemon, PokemonDetails} from "../models/pokemon-details.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseApiUrl = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/"


  constructor(private messagesService: MessagesService, private http: HttpClient) {
  }

  // region CRUD

  getPokemons(): Observable<PagedData<Pokemon>> {
    const url = this.baseApiUrl + "pokemons"
    return this.http.get<PagedData<Pokemon>>(url).pipe(
      tap(() => this.log("fetched pokemons")),
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons', undefined))
    )
  }

  getPokemon(id: Number): Observable<PokemonDetails> {
    const url = this.baseApiUrl + `pokemons/${id}`
    return this.http.get<PokemonDetails>(url).pipe(
      tap(() => this.log(`fetched pokemons with id : ${id}`)),
      catchError(this.handleError<PokemonDetails>('getPoKemon', undefined))
    )
  }

  // endregion

  // region logging

  private log(message: string): void {
    this.messagesService.add(`PokemonService: ${message}`);
  }

  private handleError<T>(operation = 'operation',result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      // TODO : send the error to remote logging infrastructure
      console.error(error); // Log to console instead

      // TODO : Better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result
      return of(result as T)
    }
  }

  // endregion
}
