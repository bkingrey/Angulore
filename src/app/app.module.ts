import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { gameReducer } from '../_store/reducer';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { SceneTitleComponent } from './scene-title/scene-title.component';
import { SceneLobbyComponent } from './scene-lobby/scene-lobby.component';
import { SceneMainComponent } from './scene-main/scene-main.component';
import { AppFacade } from './app.facade';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GameEffects } from 'src/_store/effects';

@NgModule({
  declarations: [
    AppComponent,
    SceneTitleComponent,
    SceneLobbyComponent,
    SceneMainComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('gameData', gameReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([GameEffects]),
  ],
  providers: [AppFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
