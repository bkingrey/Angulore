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
    sprites: [],
    sounds: [],
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
    // Load Images to state
    const imgs = payload.sprites.map((sprite) => {
      const img = new Image();
      img.src = sprite.src;
      return {
        ...sprite,
        img: img,
      };
    });
    const soundLibrary = payload.sounds.map((sound) => {
      const audio = new Audio(sound.src);
      return {
        ...sound,
        audio,
      };
    });
    return {
      ...state,
      loading: false,
      loaded: true,
      sprites: imgs,
      sounds: soundLibrary,
    };
  }),
  on(GameActions.ChangeScene, (state: GameState, { payload }) => {
    return {
      ...state,
      scene: payload,
    };
  })
);
