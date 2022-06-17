// GAME STATES

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from './models';
import { intializeState } from './reducer';

export const getGameData = createFeatureSelector<any>('gameData');

export const selectGameData = createSelector(
  getGameData,
  (gameData: GameState): GameState => {
    return gameData ? gameData : intializeState();
  }
);

// HELPERS

function shuffle(arr) {
  var j, x, index;
  for (index = arr.length - 1; index > 0; index--) {
    j = Math.floor(Math.random() * (index + 1));
    x = arr[index];
    arr[index] = arr[j];
    arr[j] = x;
  }
  return arr;
}
