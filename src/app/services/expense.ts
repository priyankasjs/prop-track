import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl =
    'http://localhost:3000/expenses';

  constructor(private http: HttpClient) {}

  getAll() {

    return this.http.get(this.apiUrl);

  }

}