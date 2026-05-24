import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./components/dashboard/dashboard')
        .then(m => m.Dashboard)
  },

  {
    path: 'properties',
    loadComponent: () =>
      import('./components/properties/property-list/property-list')
        .then(m => m.PropertyList)
  },

  {
  path: 'properties/add',
  loadComponent: () =>
    import('./components/properties/property-form/property-form')
      .then(m => m.PropertyForm)
},

{
  path: 'properties/edit/:id',
  loadComponent: () =>
    import('./components/properties/property-form/property-form')
      .then(m => m.PropertyForm)
},

  {
    path: 'properties/:id',
    loadComponent: () =>
      import('./components/properties/property-detail/property-detail')
        .then(m => m.PropertyDetail)
  },

  {
  path: 'tenants/add',
  loadComponent: () =>
    import('./components/tenants/tenant-form/tenant-form')
      .then(m => m.TenantForm)
},

  {
    path: 'tenants',
    loadComponent: () =>
      import('./components/tenants/tenant-list/tenant-list')
        .then(m => m.TenantList)
  },

  {
  path: 'payments/add',
  loadComponent: () =>
    import('./components/payments/payment-form/payment-form')
      .then(m => m.PaymentForm)
},

  {
    path: 'payments',
    loadComponent: () =>
      import('./components/payments/payment-list/payment-list')
        .then(m => m.PaymentList)
  },

  {
  path: 'expenses/add',
  loadComponent: () =>
    import('./components/expenses/expense-form/expense-form')
      .then(m => m.ExpenseForm)
},

  {
    path: 'expenses',
    loadComponent: () =>
      import('./components/expenses/expense-list/expense-list')
        .then(m => m.ExpenseList)
  },

  {
  path: 'tenants/edit/:id',
  loadComponent: () =>
    import('./components/tenants/tenant-form/tenant-form')
      .then(m => m.TenantForm)
},

{
  path: 'payments/edit/:id',
  loadComponent: () =>
    import('./components/payments/payment-form/payment-form')
      .then(m => m.PaymentForm)
},

  {
  path: '**',
  loadComponent: () =>
    import('./components/not-found/not-found')
      .then(m => m.NotFound)
}

];