import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { Observable, pipe, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { PeopleInterface } from '../interfaces/people.interface';

@Injectable()
export class PeopleService {

  url = environment.urlSalesLoft;
  apiKey = environment.salesLoftApiKey;
  people: PeopleInterface;

  constructor( private http: HttpClient ) { }

  // tslint:disable-next-line: typedef
  getPeople(): Observable<PeopleInterface[]>{
    const url = this.url + 'people.json';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`
    });

    return this.http.get( url, { headers } ).pipe(
      map( (resp: any) => {
        return new Array( resp );
      }),
      catchError( (err: any) => {
        return throwError(err);
      })
    );

  }

}
