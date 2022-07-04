import { Player } from './../app/classes/Player';
export interface GameState {
  loaded: boolean;
  loading: boolean;
  resolution: {
    x: number;
    y: number;
  };
  tilesets: Array<Tileset>;
  playerData: PlayerData;
  sprites: Array<Sprite>;
  sounds: Array<Sound>;
  scene: string;
  amountOfTiles: number;
  procedurals: Array<GeneratedTile>;
  fps: number;
}

export interface PlayerData {
  name: string;
  position?: Position;
  spriteSheet?: Sprite;
}

export interface Sound {
  id: string;
  src: string;
  audio: HTMLAudioElement;
}

export interface GeneratedTile {
  tileMapPosition: Position;
  x: number;
  y: number;
  boundary: boolean;
  id: string;
  entrance: boolean;
  exit: boolean;
}

export interface Tileset {
  id: string;
  src: string;
  frames: number;
  width: number;
  height: number;
  frameWidth: number;
  frameHeight: number;
  img: HTMLImageElement;
  floor: Position;
  topLeftCorner: Position;
  topRightCorner: Position;
  bottomLeftCorner: Position;
  bottomRightCorner: Position;
  horizontalSide: Position;
  verticalSide: Position;
}
export interface Sprite {
  id: string;
  src: string;
  frames: number;
  width: number;
  height: number;
  frameWidth: number;
  frameHeight: number;
  velocity: number;
  img: HTMLImageElement;
}

export interface Hitbox {
  sx: number;
  sy: number;
  height: number;
  width: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface FPS {
  interval: number;
  now: number;
  then: number;
  elaspsed: number;
}
