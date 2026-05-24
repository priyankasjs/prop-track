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
  Expense
} from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl =
    'http://localhost:3000/expenses';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Expense[]> {

    return this.http.get<Expense[]>(
      this.apiUrl
    ).pipe(
      catchError(this.handleError)
    );

  }

  getByProperty(
    propertyId: number
  ): Observable<Expense[]> {

    return this.http.get<Expense[]>(
      `${this.apiUrl}?propertyId=${propertyId}`
    ).pipe(
      catchError(this.handleError)
    );

  }

  create(
    data: Omit<Expense, 'id'>
  ): Observable<Expense> {

    return this.http.post<Expense>(
      this.apiUrl,
      data
    ).pipe(
      catchError(this.handleError)
    );

  }

  update(
    id: number,
    changes: Partial<Expense>
  ): Observable<Expense> {

    return this.http.patch<Expense>(
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