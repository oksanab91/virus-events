import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InfectionMap } from '../models';
import { EventsService, selectedInfectionSelect$ } from '../services/infection-events.service';
import { takeUntil, tap } from 'rxjs/operators';
import { fadeInAnimation } from '../animations/fade.animation';


@Component({
  selector: 'infection-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './infection-details.component.html',
  styleUrls: ['./infection-details.component.scss'],
  animations: [fadeInAnimation]
})
export class InfectionDetailsComponent implements OnInit {
  selected$: Observable<InfectionMap>
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private store: EventsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.selected$ = selectedInfectionSelect$(this.store.state$)

    this.route.paramMap.pipe(takeUntil(this.destroy$))    
    .subscribe(params => {
      let id = +params.get('id')    
      this.store.loadInfection(id).pipe(tap(),
        takeUntil(this.destroy$)).subscribe()   
      })       
  }

  ngOnDestroy() {
    this.destroy$.next(true) 
    this.destroy$.unsubscribe()
  }

}
