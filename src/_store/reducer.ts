import { createReducer, on } from '@ngrx/store';
import { GameState } from './models';
import * as GameActions from './actions';

export const intializeState = (): GameState => {
  return {
    loaded: false,
    loading: false,
    resolution: {
      x: 1024,
      y: 576,
    },
    spriteAnimations: {},
    scene: 'title',
    fps: 60,
  };
};

export const gameReducer = createReducer(
  intializeState(),
  on(GameActions.GetGameData, (state) => {
    return { ...state, loading: true };
  }),
  on(GameActions.SuccessGetGameDataAction, (state: GameState, { payload }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      spriteAnimations: payload.spriteAnimations,
    };
  }),
  on(GameActions.ChangeScene, (state: GameState, { payload }) => {
    return {
      ...state,
      scene: payload,
    };
  })
);
