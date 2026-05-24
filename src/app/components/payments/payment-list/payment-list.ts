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
  PaymentService
} from '../../../services/payment';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './payment-list.html',
  styleUrls: ['./payment-list.scss']
})
export class PaymentList
implements OnInit {

  payments: any[] = [];

  filteredPayments: any[] = [];

  selectedProperty = '';

  totalPaid = 0;

  totalOutstanding = 0;

  constructor(
    private paymentService: PaymentService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadPayments();

  }

  loadPayments(): void {

    this.paymentService.getAll()
      .subscribe((data: any) => {

        this.payments = data;

        this.filteredPayments = data;

        this.calculateTotals();

        this.cd.detectChanges();

      });

  }

  filterPayments(): void {

    if (!this.selectedProperty) {

      this.filteredPayments =
        this.payments;

    } else {

      this.filteredPayments =
        this.payments.filter(
          (payment: any) =>
            String(
              payment.propertyId
            ) ===
            this.selectedProperty
        );

    }

    this.calculateTotals();

  }

  calculateTotals(): void {

    this.totalPaid =
      this.filteredPayments
        .filter(
          (payment: any) =>
            payment.status === 'Paid'
        )
        .reduce(
          (
            sum: number,
            payment: any
          ) =>
            sum +
            Number(payment.amount),
          0
        );

    this.totalOutstanding =
      this.filteredPayments
        .filter(
          (payment: any) =>
            payment.status !== 'Paid'
        )
        .reduce(
          (
            sum: number,
            payment: any
          ) =>
            sum +
            Number(payment.amount),
          0
        );

  }

  deletePayment(
    id: string | number
  ): void {

    const confirmDelete =
      confirm(
        'Delete this payment?'
      );

    if (confirmDelete) {

      this.paymentService.delete(id)
        .subscribe(() => {

          this.loadPayments();

        });

    }

  }

}