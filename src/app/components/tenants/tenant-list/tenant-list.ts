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
  TenantService
} from '../../../services/tenant';

@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './tenant-list.html',
  styleUrls: ['./tenant-list.scss']
})
export class TenantList
implements OnInit {

  tenants: any[] = [];

  constructor(
    private tenantService: TenantService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadTenants();

  }

  loadTenants(): void {

    this.tenantService.getAll()
      .subscribe((data: any) => {

        this.tenants = data;

        this.cd.detectChanges();

      });

  }

  deleteTenant(
    id: number
  ): void {

    const confirmDelete =
      confirm(
        'Delete this tenant?'
      );

    if (confirmDelete) {

      this.tenantService.delete(id)
        .subscribe(() => {

          this.loadTenants();

        });

    }

  }

}