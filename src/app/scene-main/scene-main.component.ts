import Dungeon from '2d-dungeon';
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
      this.ctx.scale(0.5, 0.5);
      this.drawBackground();
      this.drawPlayer();
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
    this.gameData.procedurals.forEach((procedural) => {
      this.drawFromTileset(tileset, procedural.tileMapPosition, {
        x: procedural.x * tileset.frameWidth,
        y: procedural.y * tileset.frameHeight,
      });
    });
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
    this.generateDungeon();
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

  // DUNGEON GENERATION

  async generateDungeon() {
    let dungeon = new Dungeon({
      size: [400, 400],
      rooms: {
        initial: {
          min_size: [3, 3],
          max_size: [3, 3],
          max_exits: 1,
        },
        any: {
          min_size: [2, 2],
          max_size: [5, 5],
          max_exits: 4,
        },
      },
      max_corridor_length: 6,
      min_corridor_length: 2,
      corridor_density: 0,
      symmetric_rooms: false,
      interconnects: 2,
      max_interconnect_length: 10,
      room_count: 40,
    });

    await dungeon.generate();

    if (dungeon.walls.rows.length) {
      console.log(dungeon.walls.rows.length);
      const data = this.loadProceduralData(
        this.gameData,
        dungeon.walls.rows,
        dungeon.walls.rows.length,
        dungeon.walls.rows[0].length
      );
      this.sendProceduralData.emit(data);
    }

    // dungeon.size; // [width, heihgt]
    // dungeon.walls.get([x, y]); //return true if position is wall, false if empty

    // for (let piece of dungeon.children) {
    //   piece.position; //[x, y] position of top left corner of the piece within dungeon
    //   piece.tag; // 'any', 'initial' or any other key of 'rooms' options property
    //   piece.size; //[width, height]
    //   piece.walls.get([x, y]); //x, y- local position of piece, returns true if wall, false if empty
    //   for (let exit of piece.exits) {
    //     let { x, y, dest_piece } = exit; // local position of exit and piece it exits to
    //     piece.global_pos([x, y]); // [x, y] global pos of the exit
    //   }

    //   piece.local_pos(dungeon.start_pos); //get local position within the piece of dungeon's global position
    // }

    // dungeon.initial_room; //piece tagged as 'initial'
    // dungeon.start_pos; //[x, y] center of 'initial' piece
  }
}
