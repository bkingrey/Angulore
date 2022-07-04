import { EventEmitter, Output } from '@angular/core';
import {
  GameState,
  GeneratedTile,
  Position,
  Procedurals,
  Tileset,
} from 'src/_store/models';

export class MainUtils {
  loadProceduralData(gameData: GameState): Procedurals {
    const tileset = gameData.tilesets[0];
    const proceduralCorners = [...gameData.procedural.corners];
    const proceduralSides = [...gameData.procedural.sides];
    for (let i = 0; i < 55; i++) {
      if (!proceduralCorners.length) {
        proceduralCorners.push(
          this.getRandomCorner(tileset, gameData.amountOfTiles)
        );
      } else {
        const newCorner = this.getRandomCorner(tileset, gameData.amountOfTiles);
        let canPush = proceduralCorners.every((corner) => {
          if (
            newCorner.x >= corner.x + 5 ||
            newCorner.y >= corner.y + 5 ||
            newCorner.x <= corner.x - 5 ||
            newCorner.y <= corner.y - 5
          ) {
            return true;
          } else {
            return false;
          }
        });
        if (canPush) {
          proceduralCorners.push(newCorner);
        }
      }
    }
    proceduralCorners.forEach((corner) => {
      for (let i = 0; i < 4; i++)
        proceduralSides.push(
          this.getMatchingHorizontalSide(tileset, corner, i)
        );
      for (let i = 0; i < 4; i++)
        proceduralSides.push(this.getMatchingVerticalSide(tileset, corner, i));
    });
    return { corners: proceduralCorners, sides: proceduralSides };
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
