import { Component } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budgeting',
  templateUrl: './budgeting.component.html',
  styleUrls: ['./budgeting.component.css']
})
export class BudgetingComponent {
  categories: string[] = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Other'];
  selectedCategory: string = ''; // Track selected category from dropdown
  amount!: number;

  constructor(private budgetService: BudgetService,private router:Router) {}

  onSubmit() {
    const budget = { category: this.selectedCategory, amount: this.amount };
    this.budgetService.setBudget(budget).subscribe(
      (success) => {
        console.log('Budget set successfully')
        this.router.navigate(['/dashboard']);
      },
      (error)=>{
       console.error('Failed to set budget', error)
      }
    );
  }
}
