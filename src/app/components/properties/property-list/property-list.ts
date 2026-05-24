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
  PropertyService
} from '../../../services/property';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './property-list.html',
  styleUrls: ['./property-list.scss']
})
export class PropertyList
implements OnInit {

  properties: any[] = [];

  loading = true;

  constructor(
    private propertyService: PropertyService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadProperties();

  }

  loadProperties(): void {

    this.propertyService.getAll()
      .subscribe((data: any) => {

        this.properties = data;

        this.loading = false;

        this.cd.detectChanges();

      });

  }

  deleteProperty(
    id: number | string
  ): void {

    const confirmDelete =
      confirm(
        'Are you sure you want to delete this property?'
      );

    if (confirmDelete) {

      this.propertyService.delete(id)
        .subscribe(() => {

          this.loadProperties();

        });

    }

  }

}