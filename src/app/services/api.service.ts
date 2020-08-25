import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Infection, User, InfectionMap } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'      
  })

  constructor(private http: HttpClient) {
    this.initLocalCollection()
  }

  getUser(userId: number): Observable<User> {
    let url = `api/user/${userId}`
    const data = this.getLocaStorage()

    if(environment.production) {
      return this.http.get<User>(url, {headers: this.headers})
        .pipe(map(user => {          
          const local = {
            ...data,            
            user: user
          }
          localStorage.setItem('infections', JSON.stringify(local))

          return user
        }))
    }    
    
    return of(data['user'])
  }

  getInfections(userId: number): Observable<Infection[]> {
    let url = `api/user/${userId}/infections`
    const data = this.getLocaStorage()

    if(environment.production) return this.http.get<Infection[]>(url, {headers: this.headers})    
      .pipe(map(infects => {
        const local = {
          ...data,
          infections: [...infects]
        }
      localStorage.setItem('infections', JSON.stringify(local))

      return infects
    }))

    return of(data['infections'])
  }

  getInfection(id: number): Observable<InfectionMap> {
    const data = this.getLocaStorage()
    const infection = data['infections'].filter(inf => inf.id === id)[0]

    const local = 
    {
      ...data,      
      selectedInfection: infection
    }
    localStorage.setItem('infections', JSON.stringify(local))

    return of({...infection, map: this.getMappedUrl(infection)})
  }

  getLocaStorage(){
    const local = JSON.parse(localStorage.getItem('infections'))    
    return local
  }

  private getMappedUrl(infection: Infection): string {
    let url = 'https://www.google.com/maps/search/';
    if(infection.location) url = `${url}?api=1&query=${infection.location.lat},${infection.location.lon}`
    return url;
  }

  private initLocalCollection() {
    const infections = [
      {
        id: 1,        
        datetime: '2020-06-15',
        location: {lon: -122.0842499, lat: 37.4224764}       
      },
      {
        id: 2,        
        datetime: '2020-07-25',
        location: {lon: -122.0829009197085, lat: 37.4238253802915}       
      },
      {
        id: 3,        
        datetime: '2020-08-17',
        location: {lon: -122.0855988802915, lat: 37.4211274197085}       
      },
      {
        id: 4,        
        datetime: '2020-08-22',
        location: {lon: -122.0855988802915, lat: 37.4211274197085}       
      }  

    ]
    
    localStorage.clear()

    const state = 
    {
      infections: infections,
      selectedInfection: infections.length>0 ? {...infections[0]} : null,
      user: {id: 1, fname: 'Tom', lname: 'Tram'}
    }

    localStorage.setItem('infections', JSON.stringify(state))       
  }
}
