import {Component, OnInit} from '@angular/core';
import {Hero} from "../models/hero.model";
import {HeroService} from "../services/hero.service";

@Component({
  selector: 'sw-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = []

  add(name: string): void {
    name = name.trim();
    if (!name) { return; } // If name is blank => return
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      if(hero !== undefined) {
        this.heroes = this.heroes ? [...this.heroes, hero] : [hero];
      }
    });
  }

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(heroes =>
      this.heroes = heroes
    )
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes?.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
