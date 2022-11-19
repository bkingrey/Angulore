import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-scene-title',
  templateUrl: './scene-title.component.html',
  styleUrls: ['./scene-title.component.scss'],
})
export class SceneTitleComponent implements OnInit {
  @Output() changeScene = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
