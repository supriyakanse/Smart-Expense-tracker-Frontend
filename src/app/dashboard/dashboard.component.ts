import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenseChart();
  }

  loadExpenseChart() {
    this.expenseService.getExpensesCombinedByCategory().subscribe(expenses => {
   
      const categories = expenses.map(expense => expense.category);
      const amounts = expenses.map(expense => expense.totalAmount); // Adjusted to match the summed totalAmount

      Chart.register(...registerables);

      new Chart('expenseChart', {
        type: 'bar',
        data: {
          labels: categories,
          datasets: [
            {
              label: 'Expenses',
              data: amounts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true, // Added to start y-axis from zero
              type: 'linear'
            }
          }
        }
      });
    });
  }}
