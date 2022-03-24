import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PokedexTeamListComponent} from './pokedex-team-list.component';

describe('PokedexTeamListComponent', () => {
  let component: PokedexTeamListComponent;
  let fixture: ComponentFixture<PokedexTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokedexTeamListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
