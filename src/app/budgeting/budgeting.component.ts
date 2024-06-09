import { Component } from '@angular/core';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-budgeting',
  templateUrl: './budgeting.component.html',
  styleUrls: ['./budgeting.component.css']
})
export class BudgetingComponent {
  category!: string;
  amount!: number;

  constructor(private budgetService: BudgetService) {}

  onSubmit() {
    const budget = { category: this.category, amount: this.amount };
    this.budgetService.setBudget(budget).subscribe(
      success => console.log('Budget set successfully'),
      error => console.error('Failed to set budget', error)
    );
  }
}
