import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ExpenseService } from '../../../services/expense';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-list.html',
  styleUrls: ['./expense-list.scss']
})
export class ExpenseList implements OnInit {

  expenses: any[] = [];

  constructor(
    private expenseService: ExpenseService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.expenseService.getAll()
      .subscribe((data: any) => {

        this.expenses = data;

        this.cd.detectChanges();

      });

  }

}