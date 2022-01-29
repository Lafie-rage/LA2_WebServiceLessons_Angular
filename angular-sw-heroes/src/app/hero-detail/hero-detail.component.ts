import {Component, OnInit} from '@angular/core';
import {Hero} from "../models/hero.model";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../services/hero.service";
import {Location} from '@angular/common';

@Component({
  selector: 'sw-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) {

  }

  getHero() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.heroService.getHero(id).subscribe(hero => this.hero = hero)
  }

  ngOnInit(): void {
    this.getHero()
  }

  goBack() {
    this.location.back()
  }

  save() {
    this.heroService.updateHero(<Hero>this.hero).subscribe(() => this.goBack())
  }

  changeHeroName(target: EventTarget | null) {
    if(this.hero !== undefined) {
      this.hero.name = (<HTMLInputElement>target).value // Convert target to HTMLInputElement to get the value property...
    }
  }
}
