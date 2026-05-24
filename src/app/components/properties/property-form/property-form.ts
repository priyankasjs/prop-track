import {
  Component
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
export class PropertyForm {

  statuses = Object.values(
    PropertyStatus
  );

  loading = false;

  errorMessage = '';

  propertyForm: any;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router
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

  onSubmit(): void {

    if (
      this.propertyForm.invalid
    ) {

      this.propertyForm.markAllAsTouched();

      return;

    }

    this.loading = true;

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