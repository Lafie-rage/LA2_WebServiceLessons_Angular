import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {Hero} from "../models/hero.model";
import {HeroService} from "../services/hero.service";

@Component({
  selector: 'sw-heroes-search',
  templateUrl: './heroes-search.component.html',
  styleUrls: ['./heroes-search.component.css']
})
export class HeroesSearchComponent implements OnInit {

  // region private properties
  private searchTerms = new Subject<string>()
  // endregion

  // region public properties
  heroes$ : Observable<Hero[]> = new Observable<Hero[]>()
  // endregion

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    )
  }

  search(term: string) {
    this.searchTerms.next(term)
  }
}
