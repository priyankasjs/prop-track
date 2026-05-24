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
  Router
} from '@angular/router';

import {
  ExpenseService
} from '../../../services/expense';

import {
  PropertyService
} from '../../../services/property';

import {
  ExpenseType
} from '../../../models/expense.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './expense-form.html',
  styleUrls: ['./expense-form.scss']
})
export class ExpenseForm
implements OnInit {

  properties: any[] = [];

  expenseTypes =
    Object.values(ExpenseType);

  loading = false;

  errorMessage = '';

  expense = {

    propertyId: '',

    type: '',

    description: '',

    amount: 0,

    date: ''

  };

  constructor(
    private expenseService: ExpenseService,
    private propertyService: PropertyService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.propertyService.getAll()
      .subscribe((data: any) => {

        this.properties = data;

        this.cd.detectChanges();

      });

  }

  onSubmit(
    form: any
  ): void {

    if (
      form.invalid
    ) {

      return;

    }

    this.loading = true;

    this.expenseService.create(
      this.expense as any
    ).subscribe({

      next: () => {

        this.loading = false;

        form.resetForm();

        this.router.navigate([
          '/expenses'
        ]);

      },

      error: () => {

        this.loading = false;

        this.errorMessage =
          'Failed to save expense';

      }

    });

  }

}

/*
Why Template-Driven Forms
for Expense?

Expense data is simpler and
requires less complex validation,
making template-driven forms a
good choice because they are
faster to build and easier to
manage for smaller forms.

Why Reactive Forms for Payments?

Payments require more structured
validation, dynamic form control,
and better scalability, making
reactive forms more suitable.
*/