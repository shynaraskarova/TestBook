import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpinComponent {
  @Input() isSpinning: boolean;
  constructor(
  ) {}
}
