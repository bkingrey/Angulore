export interface GameState {
  loaded: boolean;
  loading: boolean;
  resolution: {
    x: number;
    y: number;
  };
  sprites: Array<Sprite>;
  sounds: Array<Sound>;
  scene: string;
  fps: number;
}

export interface Sound {
  id: string;
  src: string;
  audio: HTMLAudioElement;
}
export interface Sprite {
  id: string;
  src: string;
  frames: number;
  frameWidth: number;
  frameHeight: number;
  velocity: number;
  hitbox?: Hitbox;
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
