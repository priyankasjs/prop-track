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
  TenantService
} from '../../../services/tenant';

import {
  PropertyService
} from '../../../services/property';

import {
  PropertyStatus
} from '../../../models/property.model';

@Component({
  selector: 'app-tenant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './tenant-form.html',
  styleUrls: ['./tenant-form.scss']
})
export class TenantForm
implements OnInit {

  properties: any[] = [];

  loading = false;

  errorMessage = '';

  tenantForm: any;

  constructor(
    private fb: FormBuilder,
    private tenantService: TenantService,
    private propertyService: PropertyService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {

    this.tenantForm =
      this.fb.group({

        name: [
          '',
          Validators.required
        ],

        contact: [
          '',
          Validators.required
        ],

        propertyId: [
          '',
          Validators.required
        ],

        leaseStart: [
          '',
          Validators.required
        ],

        leaseEnd: [
          '',
          Validators.required
        ]

      });

  }

  ngOnInit(): void {

    this.propertyService.getAll()
      .subscribe((data: any) => {

        console.log(data);

        this.properties = data;

        this.cd.detectChanges();

      });

  }

  onSubmit(): void {

    if (
      this.tenantForm.invalid
    ) {

      this.tenantForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.tenantService.create(
      this.tenantForm.value
    ).subscribe({

      next: () => {

        const propertyId =
          this.tenantForm.value.propertyId;

        this.propertyService.update(
          propertyId,
          {
            status:
              PropertyStatus.Occupied
          }
        ).subscribe();

        this.loading = false;

        this.tenantForm.reset();

        this.router.navigate([
          '/tenants'
        ]);

      },

      error: () => {

        this.loading = false;

        this.errorMessage =
          'Failed to save tenant';

      }

    });

  }

}