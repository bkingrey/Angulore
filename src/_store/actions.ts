import { createAction, props } from '@ngrx/store';
import { GameState, GeneratedTile, Procedurals } from './models';

export const GetGameData = createAction('[GameData] Get Game Data');

export const SuccessGetGameDataAction = createAction(
  '[GameData] - Success Get Game Data',
  props<{ payload: GameState }>()
);

export const ErrorGameDataAction = createAction(
  '[GameData] - Game Data Error',
  props<Error>()
);

export const ChangeScene = createAction(
  '[GameData] - Change Scene',
  props<{ payload: string }>()
);

export const ChangeProceduralData = createAction(
  '[GameData] - Change Procedural Data',
  props<{ payload: Procedurals }>()
);
