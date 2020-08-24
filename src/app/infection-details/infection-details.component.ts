import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Infection } from '../models';
import { EventsService, selectedInfectionSelect$ } from '../services/infection-events.service';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'infection-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './infection-details.component.html',
  styleUrls: ['./infection-details.component.scss']
})
export class InfectionDetailsComponent implements OnInit {
  infection$: Observable<Infection>
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private store: EventsService,
              private route: ActivatedRoute) { }

  ngOnInit() {    
    this.infection$ = selectedInfectionSelect$(this.store.state$)

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
