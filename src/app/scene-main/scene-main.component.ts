import {
  GeneratedTile,
  Position,
  Sprite,
  Tileset,
} from './../../_store/models';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
  @Output() sendProceduralData = new EventEmitter();
  ctx: CanvasRenderingContext2D | null = null;
  then: number = 0;
  animate: any;
  fps: FPS = {
    interval: 0,
    now: 0,
    then: 0,
    elaspsed: 0,
  };

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
    for (let i = 0; i <= this.gameData.amountOfTiles; i++) {
      for (let j = 0; j <= this.gameData.amountOfTiles; j++) {
        // DRAW FLOOR
        this.drawFromTileset(tileset, tileset.floor, {
          x: i * tileset.frameWidth,
          y: j * tileset.frameHeight,
        });
        let corner = this.getBorderCorner(
          tileset,
          i,
          j,
          this.gameData.amountOfTiles
        );
        let side = this.getBorderSide(
          tileset,
          i,
          j,
          this.gameData.amountOfTiles
        );
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
    this.gameData.procedurals.forEach((procedural) => {
      this.drawFromTileset(tileset, procedural.tileMapPosition, {
        x: procedural.x * tileset.frameWidth,
        y: procedural.y * tileset.frameHeight,
      });
    });
    // // DRAW PROCEDURAL CORNERS
    // this.gameData.procedural.corners.forEach((corner) => {
    //   this.drawFromTileset(tileset, corner.tileMapPosition, {
    //     x: corner.x * tileset.frameWidth,
    //     y: corner.y * tileset.frameHeight,
    //   });
    // });
    // // DRAW PROCEDURAL SIDES
    // this.gameData.procedural.sides.forEach((side) => {
    //   this.drawFromTileset(tileset, side.tileMapPosition, {
    //     x: side.x * tileset.frameWidth,
    //     y: side.y * tileset.frameHeight,
    //   });
    // });
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
    this.sendProceduralData.emit(this.loadProceduralData(this.gameData));
    this.loadCanvas();
    this.startAnimatingAtFPS(this.gameData.fps);
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
