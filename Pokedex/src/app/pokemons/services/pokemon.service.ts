import {Injectable} from '@angular/core';
import {catchError, Observable, tap} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {MessagesService} from "../../messages/services/message.service";
import {PagedData} from "../../common/paged-data";
import {Pokemon, PokemonDetails} from "../models/pokemon-details.model";
import {BaseService} from "../../common/services/BaseService";
import {CookieService} from "ngx-cookie-service";
import {AuthenticationTokens} from "../../authentication/models/authentication-tokens.models";

@Injectable({
  providedIn: 'root'
})
export class PokemonService extends BaseService {

  constructor(private http: HttpClient, messagesService: MessagesService, private cookieService: CookieService) {
    super(messagesService);
  }

  // region CRUD Pokemons

  /**
   * Retrieve the first bit of the item list via the API.
   * This bit of the list is determined by its offset which is provided.
   * Manage errors messages and returns it as an Observable.
   *
   * @param offset The starting point from which the N items must be returned.
   *
   * @return The Observable containing the list as a PagedData.
   */
  getPokemons(offset: number): Observable<PagedData<Pokemon>> {
    const url = this.baseApiUrl + `pokemons?limit=20&offset=${offset}`
    return this.http.get<PagedData<Pokemon>>(url).pipe(
      tap(() => this.log(`fetched pokemons with offset ${offset}`)),
      catchError(this.handleError<PagedData<Pokemon>>(`getPokemons with offset ${offset}`, undefined))
    )
  }

  /**
   * Call the API to get every Pokemon with a name containing the provided query or with the same id has the provided one.
   * In case of error, an message is pushed through the MessageService.
   *
   * @param query A part of the Pokemon's name or its id.
   *
   * @return An Observable on which the fetched data will be emitted.
   */
  searchPokemons(query: string): Observable<PagedData<Pokemon>> {
    const url = this.baseApiUrl + `pokemons`
    const params = new HttpParams()
      .set("search", query)
    return this.http.get<PagedData<Pokemon>>(url, {params}).pipe(
      tap(() => this.log(`search pokemon with query : $query`)),
      catchError(this.handleError<PagedData<Pokemon>>(`searchPokemons with query $query`, undefined))
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
      catchError(this.handleError<PokemonDetails>('getPokemon', undefined))
    )
  }

  // endregion

  // region CRUD Team

  /**
   * Retrieve the ids of the pokemon in the team player.
   * Manage JWT authentication.
   *
   * @return An observable containing the list of the ids.
   */
  getPokemonTeam(): Observable<number[]> {
    const url = this.baseApiUrl + "trainers/me/team"
    const token = this.getAuthenticationToken()
    const headers = new HttpHeaders({'Authorization': `Bearer ${token.access_token}`})

    return this.http.get<number[]>(url, {
      headers
    }).pipe(
      tap(() => this.log("fetched pokemons team")),
      catchError(this.handleError<number[]>("getPokemonTeam", []))
    )
  }

  /**
   * Update the pokemon team of a user depending on the provided new list of pokemons.
   *
   * @param newTeamId The id of the pokemons in the team.
   * @return An observable containing nothing.
   */
  updatePokemonTeam(newTeamId: number[]): Observable<never> {
    const url = this.baseApiUrl + "trainers/me/team"
    const token = this.getAuthenticationToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.access_token}`,
      'Content-Type': 'application/json',
    })

    const body = newTeamId

    return this.http.put<never>(url, body, {
      headers,
    }).pipe(
      tap(() => this.log(`Updated pokemon team using id ${body}`)),
      catchError(this.handleError<never>("updatePokemonTeam", undefined))
    )
  }

  // endregion

  /**
   * Retrieve the authentication token linked to the logged user.
   *
   * @return The authentication token of the current user.
   */
  getAuthenticationToken(): AuthenticationTokens {
    return {
      access_token: this.cookieService.get("JWT_TOKEN_ACCESS"),
      refresh_token: this.cookieService.get("JWT_TOKEN_REFRESH"),
    }
  }
}
