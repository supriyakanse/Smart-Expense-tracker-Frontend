import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ExpenseEditComponent implements OnInit {
  expenseId!: string;
  expenseForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.expenseId = this.route.snapshot.params['id'];
    this.initExpenseForm();
    this.loadExpenseDetails();
  }

  initExpenseForm(): void {
    this.expenseForm = this.formBuilder.group({
      // Define form controls here
      // Example:
      title: ['', Validators.required],
      amount: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      // Add more fields as needed
    });
  }

  loadExpenseDetails(): void {
    this.expenseService.getExpenseById(this.expenseId).subscribe(
      (expense) => {
        // Populate form fields with expense details
        this.expenseForm.patchValue({
          title: expense.res.title,
          amount: expense.res.amount,
          category: expense.res.category,
          date: expense.res.date,
          // Patch more fields as needed
        });
      },
      (error) => {
        console.log('Error loading expense details:', error);
        // Handle error loading expense details
      }
    );
  }

  updateExpense(): void {
    if (this.expenseForm.invalid) {
      return;
    }

    const expenseData = this.expenseForm.value;
    this.expenseService.updateExpense(this.expenseId, expenseData).subscribe(
      () => {
        console.log('Expense updated successfully');
        // Optionally, redirect to expense list page
        this.router.navigate(['/expenses/list']);
      },
      (error) => {
        console.log('Error updating expense:', error);
        // Handle error updating expense
      }
    );
  }

}
