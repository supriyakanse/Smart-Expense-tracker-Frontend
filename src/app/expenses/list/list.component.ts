import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ExpenseListComponent implements OnInit {

  expenses: any[] = [];
  filteredExpenses: any[] = [];
  displayedColumns: string[] = ['title', 'amount', 'category', 'actions'];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private expenseService: ExpenseService, private router: Router) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      this.filteredExpenses = expenses;
      this.categories = [...new Set(expenses.map(expense => expense.category))];
    });
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id).subscribe(
      success => this.loadExpenses(),
      error => console.error('Failed to delete expense', error)
    );
  }

  updateExpense(id: string) {
    this.router.navigate(['/expenses/edit/' + id]);
  }

  filterByCategory() {
    if (this.selectedCategory) {
      this.filteredExpenses = this.expenses.filter(expense => expense.category === this.selectedCategory);
    } else {
      this.filteredExpenses = this.expenses;
    }
  }

  redirectToSetBudget() {
    this.router.navigate(['/budgeting']);
  }
}
