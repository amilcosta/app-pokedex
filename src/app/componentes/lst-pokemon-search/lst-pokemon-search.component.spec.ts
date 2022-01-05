import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstPokemonSearchComponent } from './lst-pokemon-search.component';

describe('LstPokemonSearchComponent', () => {
  let component: LstPokemonSearchComponent;
  let fixture: ComponentFixture<LstPokemonSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstPokemonSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstPokemonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
