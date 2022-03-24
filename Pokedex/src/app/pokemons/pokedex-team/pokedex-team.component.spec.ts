import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PokedexTeamComponent} from './pokedex-team.component';

describe('PokedexTeamComponent', () => {
  let component: PokedexTeamComponent;
  let fixture: ComponentFixture<PokedexTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokedexTeamComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
