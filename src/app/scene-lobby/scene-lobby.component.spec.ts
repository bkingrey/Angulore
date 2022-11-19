import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneLobbyComponent } from './scene-lobby.component';

describe('SceneLobbyComponent', () => {
  let component: SceneLobbyComponent;
  let fixture: ComponentFixture<SceneLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceneLobbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
