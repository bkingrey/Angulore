import { Component, OnInit } from '@angular/core';
import { ChangeScene, GetGameData } from 'src/_store/actions';
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

  changeScene(scene: string) {
    this.facade.dispatch(ChangeScene({ payload: scene }));
  }
}
