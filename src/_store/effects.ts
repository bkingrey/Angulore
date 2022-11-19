import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { of, Observable, mergeMap, map, catchError } from 'rxjs';
import { GameState } from './models';
import { gameData } from 'src/assets/json/gamaData';
import {
  ErrorGameDataAction,
  GetGameData,
  SuccessGetGameDataAction,
} from './actions';

@Injectable()
export class GameEffects {
  constructor(private action$: Actions, public store: Store<GameState>) {}

  private jsonData$ = of(gameData);

  GetGameData$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(GetGameData),
      mergeMap((action) =>
        this.jsonData$.pipe(
          map((data: GameState) => {
            return SuccessGetGameDataAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(ErrorGameDataAction(error));
          })
        )
      )
    )
  );
}
