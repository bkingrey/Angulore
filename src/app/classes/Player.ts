import { intializeState } from 'src/_store/reducer';
import { GameState, PlayerData, Position } from 'src/_store/models';

export class Player {
  currentFrame: number = 0;
  slowIndex: number = 0;
  slowRate: number = 12;
  velocity: number = 1;
  gameData: GameState = intializeState();
  playerData: PlayerData;

  constructor(playerData: PlayerData) {
    this.playerData = playerData;
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.playerData.spriteSheet && this.playerData.position) {
      const playerSpriteSheet = this.playerData.spriteSheet;
      if (this.slowIndex > this.slowRate) {
        if (this.currentFrame + 1 < playerSpriteSheet.frames) {
          this.currentFrame++;
        } else {
          this.currentFrame = 0;
        }
        this.slowIndex = 0;
      } else {
        this.slowIndex++;
      }
      ctx.drawImage(
        playerSpriteSheet.img,
        this.currentFrame * playerSpriteSheet.frameWidth,
        0,
        playerSpriteSheet.frameWidth,
        playerSpriteSheet.frameHeight,
        this.playerData.position.x * playerSpriteSheet.frameWidth,
        this.playerData.position.y * playerSpriteSheet.frameHeight,
        playerSpriteSheet.frameWidth,
        playerSpriteSheet.frameHeight
      );
    }
  }
}
