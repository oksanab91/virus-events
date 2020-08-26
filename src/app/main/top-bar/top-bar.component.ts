import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { User } from '../../models';

@Component({
  selector: 'top-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  @Input() user: User
  @Input() infectNumber: number  

  constructor() { }

}
