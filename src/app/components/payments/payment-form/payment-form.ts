import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  PaymentService
} from '../../../services/payment';

import {
  PropertyService
} from '../../../services/property';

import {
  TenantService
} from '../../../services/tenant';

import {
  PaymentStatus
} from '../../../models/payment.model';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './payment-form.html',
  styleUrls: ['./payment-form.scss']
})
export class PaymentForm
implements OnInit {

  properties: any[] = [];

  tenants: any[] = [];

  statuses =
    Object.values(PaymentStatus);

  loading = false;

  errorMessage = '';

  paymentForm: any;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private propertyService: PropertyService,
    private tenantService: TenantService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {

    this.paymentForm =
      this.fb.group({

        propertyId: [
          '',
          Validators.required
        ],

        tenantId: [
          '',
          Validators.required
        ],

        amount: [
          0,
          [
            Validators.required,
            Validators.min(1)
          ]
        ],

        date: [
          '',
          Validators.required
        ],

        status: [
          '',
          Validators.required
        ]

      });

  }

  ngOnInit(): void {

    this.propertyService.getAll()
      .subscribe((data: any) => {

        this.properties = data;

        this.cd.detectChanges();

      });

    this.tenantService.getAll()
      .subscribe((data: any) => {

        this.tenants = data;

        this.cd.detectChanges();

      });

  }

  onSubmit(): void {

    if (
      this.paymentForm.invalid
    ) {

      this.paymentForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.paymentService.create(
      this.paymentForm.value
    ).subscribe({

      next: () => {

        this.loading = false;

        this.paymentForm.reset();

        this.router.navigate([
          '/payments'
        ]);

      },

      error: () => {

        this.loading = false;

        this.errorMessage =
          'Failed to save payment';

      }

    });

  }

}