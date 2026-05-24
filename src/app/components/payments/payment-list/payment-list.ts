import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

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
    RouterLink
  ],
  templateUrl: './payment-list.html',
  styleUrls: ['./payment-list.scss']
})
export class PaymentList
implements OnInit {

  payments: any[] = [];

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

        this.cd.detectChanges();

      });

  }

  deletePayment(
    id: number
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