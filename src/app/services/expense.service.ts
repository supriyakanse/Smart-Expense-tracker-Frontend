import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
   token = localStorage.getItem('jwtToken');

  private apiUrl = 'http://localhost:5000/api/expenses';

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<any[]> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.apiUrl,{ headers });
  }

  addExpense(expense: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl, expense,{headers});
  }

  deleteExpense(id: string): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/${id}`,{headers});
  }

  getExpenseById(expenseId: string): Observable<any> {
    console.log("getExpense")
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${expenseId}`;
    return this.http.get<any>(url,{headers});
  }

  updateExpense(expenseId: string, expenseData: any): Observable<any> {
    const url = `${this.apiUrl}/${expenseId}`;
    return this.http.put<any>(url, expenseData);
  }
}
