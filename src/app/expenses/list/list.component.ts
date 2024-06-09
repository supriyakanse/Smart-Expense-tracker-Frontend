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
  displayedColumns: string[] = ['title', 'amount', 'category', 'actions'];

  constructor(private expenseService: ExpenseService,private router:Router) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id).subscribe(
      success => this.loadExpenses(),
      error => console.error('Failed to delete expense', error)
    );
  }

  updateExpense(id:any){
    console.log("Update expense"+id)
    this.router.navigate(['/expenses/edit/'+id])
  }
}
