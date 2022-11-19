import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneTitleComponent } from './scene-title.component';

describe('SceneTitleComponent', () => {
  let component: SceneTitleComponent;
  let fixture: ComponentFixture<SceneTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceneTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
