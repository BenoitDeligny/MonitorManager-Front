import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(environment.localUrl + 'customers');
  }

  saveCustomer(customer: Customer) {
    this.http.post(environment.localUrl + 'customers', customer).subscribe();
  }

  updateCustomer(customer: Customer) {
    this.http.put(environment.localUrl + 'customers', customer).subscribe();
  }

  deleteCustomer(id: number): void {
    this.http.delete(environment.localUrl + `customers/${id}`).subscribe();
  }
}
