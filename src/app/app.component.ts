import { Component, OnInit } from '@angular/core';
import {
  ChangeProceduralData,
  ChangeScene,
  GetGameData,
} from 'src/_store/actions';
import { GeneratedTile, Procedurals } from 'src/_store/models';
import { AppFacade } from './app.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TheLastTowerSaga';

  constructor(public facade: AppFacade) {}

  ngOnInit() {
    this.facade.dispatch(GetGameData());
  }

  // DISPATCHES
  sendProceduralData(payload: Procedurals) {
    this.facade.dispatch(ChangeProceduralData({ payload }));
  }
  changeScene(scene: string) {
    this.facade.dispatch(ChangeScene({ payload: scene }));
  }
}
