import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../services/infection-events.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  values$: Observable<any>
  userId = 1

  constructor(private store: EventsService) { }

  ngOnInit() {
    this.getCombine()
  }

  getCombine() {
    this.values$ = forkJoin(
      this.store.loadUser(this.userId),
      this.store.loadInfections(this.userId),
      this.store.loadInfection(1)     
    ).pipe(
      map(([userState, infectState, selectedState]) => {        
        return { userState, infectState, selectedState };
      })
    );
  }

  ngOnDestroy() {
    localStorage.clear()
  }
}
