import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Infection } from '../models';


@Component({
  selector: 'infection-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './infection-list.component.html',
  styleUrls: ['./infection-list.component.scss']
})
export class InfectionListComponent {
  @Input() infectList: Infection[]  
  selectedInd = 0
  title = 'Virus Infection Events'

  constructor() { }
  
  selectInfectEvent(index: number){
    this.selectedInd = index
  }

  trackByFn(index, item) {
    return item.id;
  }
}
