import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-scene-lobby',
  templateUrl: './scene-lobby.component.html',
  styleUrls: ['./scene-lobby.component.scss'],
})
export class SceneLobbyComponent implements OnInit {
  @Output() changeScene = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
