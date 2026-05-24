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
  Router,
  ActivatedRoute
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

  editMode = false;

  tenantId: string = '';

  tenantForm: any;

  constructor(
    private fb: FormBuilder,
    private tenantService: TenantService,
    private propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute,
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

        this.properties = data;

        this.cd.detectChanges();

      });

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.editMode = true;

      this.tenantId = id;

      this.tenantService.getById(id)
        .subscribe((data: any) => {

          this.tenantForm.setValue({

            name:
              data.name || '',

            contact:
              data.contact || '',

            propertyId:
              data.propertyId || '',

            leaseStart:
              data.leaseStart || '',

            leaseEnd:
              data.leaseEnd || ''

          });

          this.cd.detectChanges();

        });

    }

  }

  onSubmit(): void {

    if (
      this.tenantForm.invalid
    ) {

      this.tenantForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    if (this.editMode) {

      this.tenantService.update(
        this.tenantId,
        this.tenantForm.value
      ).subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate([
            '/tenants'
          ]);

        },

        error: () => {

          this.loading = false;

          this.errorMessage =
            'Failed to update tenant';

        }

      });

    } else {

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

}