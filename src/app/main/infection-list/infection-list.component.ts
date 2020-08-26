import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Infection } from '../../models';
import { fadeInAnimation } from '../../animations/fade.animation';



@Component({
  selector: 'infection-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './infection-list.component.html',
  styleUrls: ['./infection-list.component.scss'],
  animations: [fadeInAnimation]
})
export class InfectionListComponent implements OnInit {
  @Input() infectList: Infection[]  
  selectedInd = 0
  title = 'Virus Infection Events'

  constructor(private router: Router) { }
  
  ngOnInit() {
    if(this.infectList.length > 0) {
      setTimeout(() => {      
        this.router.navigateByUrl(`/infections/details/${this.infectList[0].id}`)
      })
    }
  }

  selectInfectEvent(index: number){
    this.selectedInd = index
  }

  trackByFn(index, item) {
    return item.id;
  }
}
