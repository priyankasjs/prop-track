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
  RentPayment
} from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl =
    'http://localhost:3000/rentPayments';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<RentPayment[]> {

    return this.http.get<RentPayment[]>(
      this.apiUrl
    ).pipe(
      catchError(this.handleError)
    );

  }

  getByProperty(
    propertyId: number
  ): Observable<RentPayment[]> {

    return this.http.get<RentPayment[]>(
      `${this.apiUrl}?propertyId=${propertyId}`
    ).pipe(
      catchError(this.handleError)
    );

  }

  create(
    data: Omit<RentPayment, 'id'>
  ): Observable<RentPayment> {

    return this.http.post<RentPayment>(
      this.apiUrl,
      data
    ).pipe(
      catchError(this.handleError)
    );

  }

  update(
    id: number,
    changes: Partial<RentPayment>
  ): Observable<RentPayment> {

    return this.http.patch<RentPayment>(
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