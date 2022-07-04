import { createReducer, on } from '@ngrx/store';
import { GameState } from './models';
import * as GameActions from './actions';

export const intializeState = (): GameState => {
  return {
    loaded: false,
    loading: false,
    resolution: {
      x: 1024,
      y: 576 * 2,
    },
    tilesets: [],
    sprites: [],
    sounds: [],
    scene: 'title',
    fps: 60,
    amountOfTiles: 49,
    procedural: {
      corners: [],
      sides: [],
    },
  };
};

export const gameReducer = createReducer(
  intializeState(),
  on(GameActions.GetGameData, (state) => {
    return { ...state, loading: true };
  }),
  on(GameActions.SuccessGetGameDataAction, (state: GameState, { payload }) => {
    // for (let i = 0; i < payload.farmableAreas.length; i += 36) {
    //   newFarmableArea.push(payload.farmableAreas.slice(i, 36 + i));
    // Load Images to state
    const tilesets = payload.tilesets.map((tileset) => {
      const img = new Image();
      img.src = tileset.src;
      return {
        ...tileset,
        img: img,
      };
    });
    const sprites = payload.sprites.map((sprite) => {
      const img = new Image();
      img.src = sprite.src;
      return {
        ...sprite,
        img: img,
      };
    });
    // const soundLibrary = payload.sounds.map((sound) => {
    //   const audio = new Audio(sound.src);
    //   return {
    //     ...sound,
    //     audio,
    //   };
    // });
    return {
      ...state,
      loading: false,
      loaded: true,
      sprites,
      tilesets,
    };
  }),
  on(GameActions.ChangeScene, (state: GameState, { payload }) => {
    return {
      ...state,
      scene: payload,
    };
  }),
  on(GameActions.ChangeProceduralData, (state: GameState, { payload }) => {
    return {
      ...state,
      procedural: payload,
    };
  })
);
