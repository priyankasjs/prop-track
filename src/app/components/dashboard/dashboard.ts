import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  forkJoin
} from 'rxjs';

import {
  PropertyService
} from '../../services/property';

import {
  TenantService
} from '../../services/tenant';

import {
  PaymentService
} from '../../services/payment';

import {
  ExpenseService
} from '../../services/expense';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard
implements OnInit {

  totalProperties = 0;

  occupiedProperties = 0;

  totalRentCollected = 0;

  totalExpenses = 0;

  netIncome = 0;

  activeTenants = 0;

  recentPayments: any[] = [];

  loading = true;

  constructor(
    private propertyService: PropertyService,
    private tenantService: TenantService,
    private paymentService: PaymentService,
    private expenseService: ExpenseService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    forkJoin({

      properties:
        this.propertyService.getAll(),

      tenants:
        this.tenantService.getAll(),

      payments:
        this.paymentService.getAll(),

      expenses:
        this.expenseService.getAll()

    }).subscribe((data: any) => {

      const properties =
        data.properties;

      const tenants =
        data.tenants;

      const payments =
        data.payments;

      const expenses =
        data.expenses;

      this.totalProperties =
        properties.length;

      this.occupiedProperties =
        properties.filter(
          (p: any) =>
            p.status === 'Occupied'
        ).length;

      this.activeTenants =
        tenants.length;

      this.totalRentCollected =
        payments.reduce(
          (
            sum: number,
            payment: any
          ) =>
            sum +
            Number(payment.amount),
          0
        );

      this.totalExpenses =
        expenses.reduce(
          (
            sum: number,
            expense: any
          ) =>
            sum +
            Number(expense.amount),
          0
        );

      this.netIncome =
        this.totalRentCollected -
        this.totalExpenses;

      this.recentPayments =
        [...payments]
          .sort(
            (
              a: any,
              b: any
            ) =>
              new Date(
                b.date
              ).getTime() -
              new Date(
                a.date
              ).getTime()
          )
          .slice(0, 5);

      this.loading = false;

      this.cd.detectChanges();

    });

  }

}