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
