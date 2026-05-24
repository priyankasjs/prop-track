import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  catchError,
  throwError
} from 'rxjs';

import {
  Property
} from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private apiUrl =
    'http://localhost:3000/properties';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Property[]> {

    return this.http.get<Property[]>(
      this.apiUrl
    ).pipe(
      catchError(this.handleError)
    );

  }

  getById(
    id: string | number
  ): Observable<Property> {

    return this.http.get<Property>(
      `${this.apiUrl}/${id}`
    ).pipe(
      catchError(this.handleError)
    );

  }

  create(
    data: Omit<Property, 'id'>
  ): Observable<Property> {

    return this.http.post<Property>(
      this.apiUrl,
      data
    ).pipe(
      catchError(this.handleError)
    );

  }

  update(
    id: string | number,
    changes: Partial<Property>
  ): Observable<Property> {

    return this.http.patch<Property>(
      `${this.apiUrl}/${id}`,
      changes
    ).pipe(
      catchError(this.handleError)
    );

  }

  delete(
    id: string | number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    ).pipe(
      catchError(this.handleError)
    );

  }

  private handleError(
    error: any
  ) {

    console.error(error);

    return throwError(
      () => new Error(
        'Something went wrong.'
      )
    );

  }

}