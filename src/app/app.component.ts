import { Component, OnInit } from '@angular/core';
import {
  ChangeProceduralData,
  ChangeScene,
  GetGameData,
} from 'src/_store/actions';
import { GeneratedTile } from 'src/_store/models';
import { AppFacade } from './app.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TerritoryGame';

  constructor(public facade: AppFacade) {}

  ngOnInit() {
    this.facade.dispatch(GetGameData());
  }

  // DISPATCHES
  sendProceduralData(payload: Array<GeneratedTile>) {
    this.facade.dispatch(ChangeProceduralData({ payload }));
  }
  changeScene(scene: string) {
    this.facade.dispatch(ChangeScene({ payload: scene }));
  }
}
