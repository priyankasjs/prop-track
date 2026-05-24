import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import {
  PropertyService
} from '../../../services/property';

import {
  TenantService
} from '../../../services/tenant';

import {
  PaymentService
} from '../../../services/payment';

import {
  ExpenseService
} from '../../../services/expense';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './property-detail.html',
  styleUrls: ['./property-detail.scss']
})
export class PropertyDetail
implements OnInit {

  property: any;

  tenants: any[] = [];

  payments: any[] = [];

  expenses: any[] = [];

  loading = true;

  propertyId: string = '';

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private tenantService: TenantService,
    private paymentService: PaymentService,
    private expenseService: ExpenseService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.propertyId =
      String(
        this.route.snapshot.paramMap.get('id')
      );

    this.loadProperty();

  }

  loadProperty(): void {

    this.propertyService.getById(
      this.propertyId
    ).subscribe((data: any) => {

      this.property = data;

      this.cd.detectChanges();

    });

    this.tenantService.getAll()
      .subscribe((data: any) => {

        this.tenants =
          data.filter(
            (tenant: any) =>
              String(
                tenant.propertyId
              ) === this.propertyId
          );

        this.cd.detectChanges();

      });

    this.paymentService.getAll()
      .subscribe((data: any) => {

        this.payments =
          data.filter(
            (payment: any) =>
              String(
                payment.propertyId
              ) === this.propertyId
          );

        this.cd.detectChanges();

      });

    this.expenseService.getAll()
      .subscribe((data: any) => {

        this.expenses =
          data.filter(
            (expense: any) =>
              String(
                expense.propertyId
              ) === this.propertyId
          );

        this.loading = false;

        this.cd.detectChanges();

      });

  }

}