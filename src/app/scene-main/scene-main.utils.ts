import { EventEmitter, Output } from '@angular/core';
import { GameState, GeneratedTile, Position, Tileset } from 'src/_store/models';

export class MainUtils {
  loadProceduralData(
    gameData: GameState,
    rows: Array<Array<boolean>>,
    verticalLength: number,
    horizontalLength: number
  ): Array<GeneratedTile> {
    const proceduralData: Array<GeneratedTile> = [];
    const tileset = gameData.tilesets[0];
    for (let j = 0; j < verticalLength; j++) {
      for (let i = 0; i < horizontalLength; i++) {
        if (rows[j] && rows[j][i]) {
          proceduralData.push({
            tileMapPosition: tileset.horizontalSide,
            x: i,
            y: j,
            boundary: true,
            id: `${j}${i}`,
            entrance: false,
            exit: false,
          });
        } else {
          proceduralData.push({
            tileMapPosition: tileset.floor,
            x: i,
            y: j,
            boundary: false,
            id: `${j}${i}`,
            entrance: false,
            exit: false,
          });
        }
      }
    }
    return proceduralData;
  }

  // HELPERS

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
