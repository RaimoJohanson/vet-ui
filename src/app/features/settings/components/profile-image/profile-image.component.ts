import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss'],
})
export class ProfileImageComponent {
  @Input() public src: string;
  @Output() public click: EventEmitter<any> = new EventEmitter();

  constructor() {}
}
