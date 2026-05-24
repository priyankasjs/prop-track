export enum ExpenseType {

  Maintenance = 'Maintenance',

  Repairs = 'Repairs',

  Renovation = 'Renovation'

}

export interface Expense {

  id: number;

  propertyId: number;

  type: ExpenseType;

  description: string;

  amount: number;

  date: string;

}