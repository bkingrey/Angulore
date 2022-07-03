import {
  GeneratedTile,
  Position,
  Sprite,
  Tileset,
} from './../../_store/models';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FPS, GameState } from 'src/_store/models';
import { intializeState } from 'src/_store/reducer';
import { MainUtils } from './scene-main.utils';

@Component({
  selector: 'app-scene-main',
  templateUrl: './scene-main.component.html',
  styleUrls: ['./scene-main.component.scss'],
})
export class SceneMainComponent extends MainUtils implements AfterViewInit {
  @Input() gameData: GameState = intializeState();
  @ViewChild('canvas') canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  then: number = 0;
  animate: any;
  fps: FPS = {
    interval: 0,
    now: 0,
    then: 0,
    elaspsed: 0,
  };
  amountOfTiles = 49;
  proceduralCorners: Array<GeneratedTile> = [];
  constructor() {
    super();
    this.animate = () => {
      requestAnimationFrame(this.animate);
      this.fps.now = Date.now();
      this.fps.elaspsed = this.fps.now - this.fps.then;
      if (this.fps.elaspsed > this.fps.interval) {
        this.fps.then = this.fps.now - (this.fps.elaspsed % this.fps.interval);
        this.drawingCode();
      }
    };
  }

  drawingCode() {
    if (this.ctx && this.canvas) {
      this.ctx.save();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground();
      //this.drawPlayer();
      this.ctx.restore();
    }
  }

  startAnimatingAtFPS(fps: number) {
    this.fps.interval = 1000 / fps;
    this.then = Date.now();
    this.animate();
  }

  loadCanvas() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (this.canvas) {
      this.canvas.width = this.gameData.resolution.x;
      this.canvas.height = this.gameData.resolution.y;
      this.ctx = this.canvas.getContext('2d');
      if (this.ctx) {
        this.ctx.imageSmoothingEnabled = false;
      }
    }
  }

  drawBackground() {
    if (this.canvas && this.ctx) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'black';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.stroke();
      const tileset = this.gameData.tilesets.filter(
        (sprite) => sprite.id === 'floorTileset'
      )[0];
      this.drawStage(tileset);
    }
  }

  drawStage(tileset: Tileset) {
    for (let i = 0; i <= this.amountOfTiles; i++) {
      for (let j = 0; j <= this.amountOfTiles; j++) {
        // DRAW FLOOR
        this.drawFromTileset(tileset, tileset.floor, {
          x: i * tileset.frameWidth,
          y: j * tileset.frameHeight,
        });
        let corner = this.getCorner(tileset, i, j);
        let side = this.getSide(tileset, i, j);
        let cornerOrSide = corner || side;
        if (cornerOrSide) {
          // DRAW CORNER OR SIDE
          this.drawFromTileset(tileset, cornerOrSide, {
            x: i * tileset.frameWidth,
            y: j * tileset.frameHeight,
          });
        }
      }
    }
    this.proceduralCorners.forEach((corner) => {
      // DRAW PROCEDURAL CORNERS
      this.drawFromTileset(tileset, corner.tileMapPosition, {
        x: corner.x * tileset.frameWidth,
        y: corner.y * tileset.frameHeight,
      });
    });
  }

  getCorner(tileset: Tileset, i: number, j: number): Position | undefined {
    if (i === 0 && j === 0) {
      return tileset.topLeftCorner;
    } else if (i === this.amountOfTiles && j === 0) {
      return tileset.topRightCorner;
    } else if (i === 0 && j === this.amountOfTiles) {
      return tileset.bottomLeftCorner;
    } else if (i === this.amountOfTiles && j === this.amountOfTiles) {
      return tileset.bottomRightCorner;
    }
    return;
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomCorner(tileset: Tileset) {
    const random = this.randomIntFromInterval(5, this.amountOfTiles - 5);
    let generatedTile: GeneratedTile = {
      tileMapPosition: { x: 0, y: 0 },
      x: 0,
      y: 0,
    };
    if (random < 25) generatedTile.tileMapPosition = tileset.topLeftCorner;
    else if (random < 50)
      generatedTile.tileMapPosition = tileset.topRightCorner;
    else if (random < 75)
      generatedTile.tileMapPosition = tileset.bottomLeftCorner;
    else generatedTile.tileMapPosition = tileset.bottomRightCorner;

    generatedTile.x = this.randomIntFromInterval(5, this.amountOfTiles - 5);
    generatedTile.y = this.randomIntFromInterval(5, this.amountOfTiles - 5);
    return generatedTile;
  }

  getSide(tileset: Tileset, i: number, j: number): Position | undefined {
    if (
      j > 0 &&
      j < this.amountOfTiles &&
      (i === 0 || i === this.amountOfTiles)
    ) {
      return tileset.verticalSide;
    } else if (
      i > 0 &&
      i < this.amountOfTiles &&
      (j === 0 || j === this.amountOfTiles)
    ) {
      return tileset.horizontalSide;
    }
    return;
  }

  drawFromTileset(
    tileset: Tileset,
    tileMapPosition: Position,
    canvasPosition: Position
  ) {
    if (this.ctx) {
      this.ctx.drawImage(
        tileset.img,
        tileMapPosition.x, // tilemap position x
        tileMapPosition.y, // tilemap position y
        tileset.frameWidth, // width of tile
        tileset.frameHeight, // height of tile
        canvasPosition.x, // position on canvas x
        canvasPosition.y, // positioin on canvas y
        tileset.frameWidth, // draw width
        tileset.frameHeight // draw height
      );
    }
  }

  drawPlayer() {
    if (this.canvas && this.ctx) {
      this.ctx.beginPath();
      this.ctx.rect(
        this.canvas.width / 2 - 100,
        this.canvas.height / 2 - 100,
        200,
        200
      );
      this.ctx.strokeStyle = 'red';
      this.ctx.stroke();
    }
  }

  ngAfterViewInit(): void {
    this.loadProceduralData();
    this.loadCanvas();
    this.startAnimatingAtFPS(this.gameData.fps);
  }

  loadProceduralData() {
    const tileset = this.gameData.tilesets.filter(
      (tileset) => tileset.id === 'floorTileset'
    )[0];
    this.loadProceduralCorners(tileset);
  }

  loadProceduralCorners(tileset: Tileset) {
    for (let i = 0; i < 15; i++) {
      if (!this.proceduralCorners.length) {
        this.proceduralCorners.push(this.getRandomCorner(tileset));
      } else {
        const newCorner = this.getRandomCorner(tileset);
        let canPush = this.proceduralCorners.every((corner) => {
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
          this.proceduralCorners.push(newCorner);
        }
      }
    }
  }

  keyDownEvent(event: KeyboardEvent) {
    // Do something on keydown
  }

  keyUpEvent(event: KeyboardEvent) {
    // Do something on keyup
  }

  mouseLeftClick(event: MouseEvent) {
    // Do something on leftclick
  }

  mouseRightClick(event: MouseEvent) {
    // Do something on right click
  }
}
