import { EventEmitter, Output } from '@angular/core';
import { GameState, GeneratedTile, Position, Tileset } from 'src/_store/models';

export class MainUtils {
  loadProceduralData(gameData: GameState): Array<GeneratedTile> {
    const proceduralData: Array<GeneratedTile> = [];
    const tileset = gameData.tilesets[0];
    const rowLength = Math.sqrt(gameData.roomPresets[0].length);
    for (let l = 0; l < rowLength / 2; l++) {
      for (let k = 0; k < rowLength / 2; k++) {
        for (let i = 0; i < rowLength; i++) {
          for (let j = 0; j < rowLength; j++) {
            if (tileset[gameData.roomPresets[0][j + i * 10]]) {
              proceduralData.push({
                tileMapPosition:
                  tileset[gameData.roomPresets[0][j + i * rowLength]],
                x: j + k * rowLength,
                y: i + l * rowLength,
              });
            }
          }
        }
      }
    }

    return proceduralData;
  }

  getRandomCorner(tileset: Tileset, amountOfTiles: number) {
    const random = this.randomIntFromInterval(5, amountOfTiles - 5);
    let generatedTile: GeneratedTile = {
      tileMapPosition: { x: 0, y: 0 },
      x: 0,
      y: 0,
    };
    if (random < amountOfTiles * 0.25)
      generatedTile.tileMapPosition = tileset.topLeftCorner;
    else if (random < amountOfTiles * 0.5)
      generatedTile.tileMapPosition = tileset.topRightCorner;
    else if (random < amountOfTiles * 0.75)
      generatedTile.tileMapPosition = tileset.bottomLeftCorner;
    else generatedTile.tileMapPosition = tileset.bottomRightCorner;

    generatedTile.x = this.randomIntFromInterval(5, amountOfTiles - 5);
    generatedTile.y = this.randomIntFromInterval(5, amountOfTiles - 5);
    return generatedTile;
  }

  getMatchingHorizontalSide(
    tileset: Tileset,
    corner: GeneratedTile,
    i: number
  ): GeneratedTile {
    if (corner.tileMapPosition === tileset.topLeftCorner) {
      return {
        tileMapPosition: tileset.horizontalSide,
        x: corner.x + i + 1,
        y: corner.y,
      };
    } else if (corner.tileMapPosition === tileset.topRightCorner) {
      return {
        tileMapPosition: tileset.horizontalSide,
        x: corner.x - 1 - i,
        y: corner.y,
      };
    } else if (corner.tileMapPosition === tileset.bottomLeftCorner) {
      return {
        tileMapPosition: tileset.horizontalSide,
        x: corner.x + i + 1,
        y: corner.y,
      };
    } else {
      return {
        tileMapPosition: tileset.horizontalSide,
        x: corner.x - 1 - i,
        y: corner.y,
      };
    }
  }

  getMatchingVerticalSide(
    tileset: Tileset,
    corner: GeneratedTile,
    i: number
  ): GeneratedTile {
    if (corner.tileMapPosition === tileset.topLeftCorner) {
      return {
        tileMapPosition: tileset.verticalSide,
        x: corner.x,
        y: corner.y + i + 1,
      };
    } else if (corner.tileMapPosition === tileset.topRightCorner) {
      return {
        tileMapPosition: tileset.verticalSide,
        x: corner.x,
        y: corner.y + i + 1,
      };
    } else if (corner.tileMapPosition === tileset.bottomLeftCorner) {
      return {
        tileMapPosition: tileset.verticalSide,
        x: corner.x,
        y: corner.y - i - 1,
      };
    } else {
      return {
        tileMapPosition: tileset.verticalSide,
        x: corner.x,
        y: corner.y - i - 1,
      };
    }
  }

  // INITIAL BOARD CREATION

  getBorderCorner(
    tileset: Tileset,
    i: number,
    j: number,
    amountOfTiles: number
  ): Position | undefined {
    if (i === 0 && j === 0) {
      return tileset.topLeftCorner;
    } else if (i === amountOfTiles && j === 0) {
      return tileset.topRightCorner;
    } else if (i === 0 && j === amountOfTiles) {
      return tileset.bottomLeftCorner;
    } else if (i === amountOfTiles && j === amountOfTiles) {
      return tileset.bottomRightCorner;
    }
    return;
  }

  getBorderSide(
    tileset: Tileset,
    i: number,
    j: number,
    amountOfTiles: number
  ): Position | undefined {
    if (j > 0 && j < amountOfTiles && (i === 0 || i === amountOfTiles)) {
      return tileset.verticalSide;
    } else if (i > 0 && i < amountOfTiles && (j === 0 || j === amountOfTiles)) {
      return tileset.horizontalSide;
    }
    return;
  }

  // HELPERS

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
