import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneMainComponent } from './scene-main.component';

describe('SceneMainComponent', () => {
  let component: SceneMainComponent;
  let fixture: ComponentFixture<SceneMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceneMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
