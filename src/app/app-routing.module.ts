import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './expenses/add/add.component';
import { ExpenseListComponent } from './expenses/list/list.component';
import { BudgetingComponent } from './budgeting/budgeting.component';
import { ExpenseEditComponent } from './expenses/edit/edit.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expenses/add', component: AddExpenseComponent },
  { path: 'expenses/list', component: ExpenseListComponent },
  { path: 'expenses/edit/:id', component: ExpenseEditComponent },
  { path: 'budgeting', component: BudgetingComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) // Configure RouterModule with routes
  ],
  exports: [RouterModule] // Export RouterModule to make router directives available for components
})
export class AppRoutingModule { }
