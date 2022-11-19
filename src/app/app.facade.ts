import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState } from 'src/_store/models';
import { selectGameData } from 'src/_store/selectors';

@Injectable()
export class AppFacade {
  constructor(private store: Store<GameState>) {}

  gameData$ = this.store.select(selectGameData);

  dispatch(action: any) {
    this.store.dispatch(action);
  }
}
