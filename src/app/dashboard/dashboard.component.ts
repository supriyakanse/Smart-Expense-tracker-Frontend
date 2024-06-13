import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ExpenseService } from '../services/expense.service';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  popularCategories: string[] = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Other'];
  expenseData: any[] = [];
  budgetData: any[] = [];

  constructor(
    private expenseService: ExpenseService,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    this.loadExpenseData();
  }

  loadExpenseData() {
    this.expenseService.getExpensesCombinedByCategory().subscribe(expenses => {
      this.expenseData = expenses;
      this.loadExpenseChart();
      this.loadBudgetData();
    });
  }

  loadBudgetData() {
    this.budgetService.getBudget().subscribe(budgets => {
      this.budgetData = budgets;
      this.loadBudgetVsExpenseChart();
    });
  }

  loadExpenseChart() {
    const categories = this.expenseData.map(expense => expense.category);
    const amounts = this.expenseData.map(expense => expense.totalAmount);

    Chart.register(...registerables);

    new Chart('expenseChart', {
      type: 'bar',
      data: {
        labels: categories,
        datasets: [{
          label: 'Expenses',
          data: amounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true, type: 'linear' }
        }
      }
    });
  }

  loadBudgetVsExpenseChart() {
    const categories = this.popularCategories;
    const budgetAmounts = categories.map(category => {
      const budget = this.budgetData.find(b => b.category === category);
      return budget ? budget.amount : 0;
    });

    const expenseAmounts = categories.map(category => {
      const expense = this.expenseData.find(e => e.category === category);
      return expense ? expense.totalAmount : 0;
    });

    Chart.register(...registerables);

    new Chart('budgetVsExpenseChart', {
      type: 'bar',
      data: {
        labels: categories,
        datasets: [
          {
            label: 'Budget',
            data: budgetAmounts,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Expenses',
            data: expenseAmounts,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: { beginAtZero: true, type: 'linear' }
        }
      }
    });
  }
}
