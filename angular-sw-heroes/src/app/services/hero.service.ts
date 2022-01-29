import {Injectable} from '@angular/core';
import {Hero} from "../models/hero.model";
import {catchError, Observable, of, tap} from "rxjs";
import {MessagesService} from "./messages.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // region URL
  private heroesUrl = "api/heroes"
  // endregion

  // region CRUD

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(() => this.log("HeroService: fetched heroes"))
    ).pipe(
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  getHero(id: Number): Observable<Hero | undefined> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url).pipe(
      tap(() => this.log(`HeroService: fetch hero ${id}`)),
      catchError(this.handleError<undefined>(`getHero id=${id}`, undefined))
    )
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero: Hero): Observable<Hero | undefined> {
    return this.http.post(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`added hero with id=${hero.id}`)),
      catchError(this.handleError<any>('addHero'))
    )
  }

  deleteHero(hero: Hero | number) {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // endregion

  // region other http methods

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const params = new HttpParams()
      .set('name', term);
    return this.http.get<Hero[]>(`${this.heroesUrl}`, {params}).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  // endregion

  // region logging
  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
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

  constructor(private messageService: MessagesService, private http: HttpClient) {
  }

}
