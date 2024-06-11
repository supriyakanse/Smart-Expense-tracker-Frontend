import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddExpenseComponent {
  title!: string;
  amount!: number;
  category!: string;
  popularCategories: string[] = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping'];

  constructor(private expenseService: ExpenseService, private router: Router) {}

  onSubmit() {
    const expense = { title: this.title, amount: this.amount, category: this.category };
    console.log(expense)
    this.expenseService.addExpense(expense).subscribe(
      success => {this.router.navigate(['/expenses/list']);
        console.log(success);
      },
      error => console.error('Failed to add expense', error)
    );
  }
}
