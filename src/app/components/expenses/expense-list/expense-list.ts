import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  RouterLink
} from '@angular/router';

import {
  ExpenseService
} from '../../../services/expense';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './expense-list.html',
  styleUrls: ['./expense-list.scss']
})
export class ExpenseList
implements OnInit {

  expenses: any[] = [];

  filteredExpenses: any[] = [];

  selectedType = '';

  constructor(
    private expenseService: ExpenseService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadExpenses();

  }

  loadExpenses(): void {

    this.expenseService.getAll()
      .subscribe((data: any) => {

        this.expenses = data;

        this.filteredExpenses = data;

        this.cd.detectChanges();

      });

  }

  filterExpenses(): void {

    if (!this.selectedType) {

      this.filteredExpenses =
        this.expenses;

    } else {

      this.filteredExpenses =
        this.expenses.filter(
          (expense: any) =>
            expense.type ===
            this.selectedType
        );

    }

  }

  deleteExpense(
    id: number
  ): void {

    const confirmDelete =
      confirm(
        'Delete this expense?'
      );

    if (confirmDelete) {

      this.expenseService.delete(id)
        .subscribe(() => {

          this.loadExpenses();

        });

    }

  }

}