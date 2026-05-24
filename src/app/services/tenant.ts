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
  Tenant
} from '../models/tenant.model';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private apiUrl =
    'http://localhost:3000/tenants';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Tenant[]> {

    return this.http.get<Tenant[]>(
      this.apiUrl
    ).pipe(
      catchError(this.handleError)
    );

  }

  getByProperty(
    propertyId: number
  ): Observable<Tenant[]> {

    return this.http.get<Tenant[]>(
      `${this.apiUrl}?propertyId=${propertyId}`
    ).pipe(
      catchError(this.handleError)
    );

  }

  create(
    data: Omit<Tenant, 'id'>
  ): Observable<Tenant> {

    return this.http.post<Tenant>(
      this.apiUrl,
      data
    ).pipe(
      catchError(this.handleError)
    );

  }

  update(
    id: number,
    changes: Partial<Tenant>
  ): Observable<Tenant> {

    return this.http.patch<Tenant>(
      `${this.apiUrl}/${id}`,
      changes
    ).pipe(
      catchError(this.handleError)
    );

  }

  delete(
    id: number
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