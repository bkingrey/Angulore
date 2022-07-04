import { Injectable, ViewChild } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, Action, select } from '@ngrx/store';
import {
  of,
  Observable,
  mergeMap,
  map,
  catchError,
  withLatestFrom,
} from 'rxjs';
import { GameState } from './models';
import { gameData } from 'src/assets/json/gamaData';
import {
  ErrorGameDataAction,
  GetGameData,
  SuccessGetGameDataAction,
  ChangeProceduralData,
} from './actions';
import { selectGameData } from './selectors';

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
