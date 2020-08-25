import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User, Infection, InfectionMap } from '../models';
import { ApiService } from './api.service';


export class EventState {
  infections: Infection[] = [];
  selectedInfection: InfectionMap = null;
  user: User = null;  
}

const InitEventState: EventState = {
  infections: [],
  selectedInfection: null,
  user: null
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  readonly state$: Observable<EventState>
  private _state$: BehaviorSubject<EventState>

  constructor(private apiService: ApiService) {  
    this._state$ = new BehaviorSubject(InitEventState)
    this.state$ = this._state$.asObservable()    
  }

  get state (): {infections: Infection[], selectedInfection: InfectionMap, user: User} {
    return this._state$.getValue()
  }

  setState (nextState: {infections: Infection[], selectedInfection: InfectionMap, user: User}): void {    
      this._state$.next(nextState)
  }

  loadInfections(userId: number) {
    const infections = this.apiService.getInfections(userId)
    return infections.pipe(map(data => {
      data = data.sort((a, b) => {
        const aDate = new Date(a.datetime).getTime()
        const bDate = new Date(b.datetime).getTime()        
        return bDate - aDate
      })

      this.setState({
          ...this.state,
          infections: [...data],
          selectedInfection: data.length>0 ? {...data[0], map: ''} : null         
        })
        
      return this.state
    }),
    catchError(error => { 
      console.error(error.message)
      return of(null) })
    )
  }

  loadInfection(id: number) {
    if(id < 0) return null

    const infection = this.apiService.getInfection(id)
    return infection.pipe(map(data => {
      this.setState({...this.state, selectedInfection: {...data}})

      return this.state
    }),
    catchError(error => { 
      console.error(error.message)
      return of(null) })
    )   
  }

  loadUser(id: number) {
    if(id < 0) return null

    const user = this.apiService.getUser(id)
    return user.pipe(map(data => {
      this.setState({...this.state, user: {...data}})

      return this.state
    }),
    catchError(error => { 
      console.error(error.message)
      return of(null) })
    )   
  }
}

export const userSelect$ = (state$: Observable<EventState>) => state$.pipe(map(infections => infections.user))
export const selectedInfectionSelect$ = (state$: Observable<EventState>) => state$.pipe(map(infections => infections.selectedInfection))
export const eventsAllSelect$ = (state$: Observable<EventState>) => state$.pipe(map(infections => infections.infections))
