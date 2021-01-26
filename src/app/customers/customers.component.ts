import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Customer } from '../shared/models/customer';
import { CustomersService } from './services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [MessageService, ConfirmationService],
  encapsulation: ViewEncapsulation.None,
})
export class CustomersComponent implements OnInit, OnDestroy {
  // * Mise en place des subscriptions afin de pouvoir unsubscribe
  subscription1$: Subscription;

  customers: Customer[];
  customer: Customer;
  selectedCustomers: Customer[];
  customerDialog: boolean;
  submitted: boolean;

  constructor(
    private customersService: CustomersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.subscription1$ = this.customersService
      .getAllCustomers()
      .subscribe((data) => {
        this.customers = data;
      });
  }

  ngOnDestroy() {
    this.subscription1$.unsubscribe();
  }

  openNew() {
    this.customer = {};
    this.submitted = false;
    this.customerDialog = true;
  }

  deleteSelectedCustomers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected customers?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customers = this.customers.filter(
          (val) => !this.selectedCustomers.includes(val)
        );
        for (const customer of this.selectedCustomers) {
          this.customersService.deleteCustomer(customer.id);
        }
        this.selectedCustomers = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Customers Deleted',
          life: 3000,
        });
      },
    });
  }

  editCustomer(customer: Customer) {
    this.customer = { ...customer };
    this.customerDialog = true;
  }

  deleteCustomer(customer: Customer) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + customer.customerName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customers = this.customers.filter((val) => val.id !== customer.id);
        this.customersService.deleteCustomer(customer.id);
        this.customer = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.customerDialog = false;
    this.submitted = false;
  }

  saveCustomer() {
    this.submitted = true;

    if (this.customer.id) {
      this.customers[
        this.findIndexById(this.customer.id.toString())
      ] = this.customer;
      this.customersService.updateCustomer(this.customer);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Customer Updated',
        life: 3000,
      });

      this.customers = [...this.customers];
      this.customerDialog = false;
      this.customer = {};
    } else {
      this.customersService.saveCustomer(this.customer);
      this.customers.push(this.customer);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Product Created',
        life: 3000,
      });

      this.customers = [...this.customers];
      this.customerDialog = false;
      this.customer = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.customers.length; i++) {
      if (this.customers[i].id === +id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
