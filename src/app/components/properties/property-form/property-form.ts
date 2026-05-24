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
  PropertyService
} from '../../../services/property';

import {
  PropertyStatus
} from '../../../models/property.model';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './property-form.html',
  styleUrls: ['./property-form.scss']
})
export class PropertyForm
implements OnInit {

  statuses =
    Object.values(
      PropertyStatus
    );

  loading = false;

  errorMessage = '';

  editMode = false;

  propertyId: string = '';

  propertyForm: any;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {

    this.propertyForm =
      this.fb.group({

        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],

        address: [
          '',
          Validators.required
        ],

        monthlyRent: [
          0,
          [
            Validators.required,
            Validators.min(1)
          ]
        ],

        status: [
          '',
          Validators.required
        ],

        description: ['']

      });

  }

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.editMode = true;

      this.propertyId = id;

      this.propertyService.getById(
        this.propertyId
      ).subscribe({

        next: (data: any) => {

          console.log(data);

          this.propertyForm.setValue({

            name:
              data.name || '',

            address:
              data.address || '',

            monthlyRent:
              data.monthlyRent || 0,

            status:
              data.status || '',

            description:
              data.description || ''

          });

          this.cd.detectChanges();

        },

        error: (err) => {

          console.error(err);

        }

      });

    }

  }

  onSubmit(): void {

    if (
      this.propertyForm.invalid
    ) {

      this.propertyForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    if (this.editMode) {

      this.propertyService.update(
        this.propertyId,
        this.propertyForm.value
      ).subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate([
            '/properties'
          ]);

        },

        error: () => {

          this.loading = false;

          this.errorMessage =
            'Failed to update property';

        }

      });

    } else {

      this.propertyService.create(
        this.propertyForm.value
      ).subscribe({

        next: () => {

          this.loading = false;

          this.propertyForm.reset();

          this.router.navigate([
            '/properties'
          ]);

        },

        error: () => {

          this.loading = false;

          this.errorMessage =
            'Failed to save property';

        }

      });

    }

  }

}