export interface GameState {
  loaded: boolean;
  loading: boolean;
  resolution: {
    x: number;
    y: number;
  };
  spriteAnimations: SpriteAnimation;
  scene: string;
  fps: number;
}

export interface SpriteAnimation {
  [key: string]: SpriteDetails;
}

export interface SpriteDetails {
  src: string;
  frames: number;
}

export interface FPS {
  interval: number;
  now: number;
  then: number;
  elaspsed: number;
}
