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

  /**
   * The base URL of the API.
   * @private
   */
  private baseApiUrl = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/"


  constructor(private messagesService: MessagesService, private http: HttpClient) {
  }

  // region CRUD

  /**
   * Retrieve the first bit of the item list via the API.
   * Manage errors messages and returns it as an Observable.
   *
   * @return The Observable containing the list as a PagedData.
   */
  getPokemons(): Observable<PagedData<Pokemon>> {
    const url = this.baseApiUrl + "pokemons"
    return this.http.get<PagedData<Pokemon>>(url).pipe(
      tap(() => this.log("fetched pokemons")),
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons', undefined))
    )
  }

  /**
   * Retrieve an item via the API.
   * The item is retrieved using the provided ID.
   * Manage errors messages and returns it as an Observable.
   *
   * @param id The id of the asked item.
   *
   * @return The Observable contains the item as a PokemonDetails.
   */
  getPokemon(id: Number): Observable<PokemonDetails> {
    const url = this.baseApiUrl + `pokemons/${id}`
    return this.http.get<PokemonDetails>(url).pipe(
      tap(() => this.log(`fetched pokemons with id : ${id}`)),
      catchError(this.handleError<PokemonDetails>('getPoKemon', undefined))
    )
  }

  // endregion

  // region logging

  /**
   * Transmit a new log message to the MessageService.
   *
   * @param message The message to transmit
   * @private
   */
  private log(message: string): void {
    this.messagesService.add(`PokemonService: ${message}`);
  }

  /**
   * Manage an error message by printing it in the console logs and transmiting it to the MessageService via the log() method.
   * Then, returns an Observable of the provided result type.
   *
   * @param operation A string representing the operation that throws the error.
   * @param result The wished result of calling function.
   *
   * @return A anonymous function which ask of an error of any type and returns an Observable of the provided result type.
   * @private
   */
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
