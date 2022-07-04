import { PlayerData } from 'src/_store/models';
import { createReducer, on } from '@ngrx/store';
import { GameState } from './models';
import * as GameActions from './actions';
import { Player } from 'src/app/classes/Player';

export const intializeState = (): GameState => {
  return {
    loaded: false,
    loading: false,
    resolution: {
      x: 1024,
      y: 576,
    },
    tilesets: [],
    sprites: [],
    sounds: [],
    scene: 'title',
    fps: 60,
    amountOfTiles: 49,
    procedurals: [],
    playerData: {
      name: 'John Doe',
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
      playerData: {
        name: 'John Doe',
        spriteSheet: sprites.filter(
          (sprite) => sprite.id === 'player-test-idle'
        )[0],
      },
    };
  }),
  on(GameActions.ChangeScene, (state: GameState, { payload }) => {
    return {
      ...state,
      scene: payload,
    };
  }),
  on(GameActions.ChangeProceduralData, (state: GameState, { payload }) => {
    const floorTiles = payload.filter((tile) => !tile.boundary);
    const entrance = floorTiles[Math.floor(Math.random() * floorTiles.length)];
    const remainingFloorTiles = floorTiles.filter(
      (tile) => tile.id !== entrance.id
    );
    const exit =
      remainingFloorTiles[Math.floor(Math.random() * floorTiles.length)];
    const newPayload = payload.map((tile) => {
      if (tile.id === entrance.id) {
        return {
          ...tile,
          entrance: true,
          exit: false,
        };
      } else if (tile.id === exit.id) {
        return {
          ...tile,
          entrance: false,
          exit: true,
        };
      }
      return {
        ...tile,
        entrance: false,
        exit: false,
      };
    });

    return {
      ...state,
      procedurals: newPayload,
      playerData: {
        ...state.playerData,
        position: {
          x: newPayload.filter((tile) => tile.entrance)[0].x,
          y: newPayload.filter((tile) => tile.entrance)[0].y,
        },
      },
    };
  })
);
