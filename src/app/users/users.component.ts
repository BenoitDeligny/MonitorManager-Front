import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService, ConfirmationService],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit, OnDestroy {
  // * Mise en place des subscriptions afin de pouvoir unsubscribe
  subscription1$: Subscription;

  users: any[];
  user: any;
  selectedUsers: any[];
  userDialog: boolean;
  submitted: boolean;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.subscription1$ = this.usersService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  ngOnDestroy() {
    this.subscription1$.unsubscribe();
  }

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter(
          (val) => !this.selectedUsers.includes(val)
        );
        for (const user of this.selectedUsers) {
          this.usersService.deleteUser(user.id);
        }
        this.selectedUsers = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Users Deleted',
          life: 3000,
        });
      },
    });
  }

  editUser(user: any) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter((val) => val.id !== user.id);
        this.usersService.deleteUser(user.id);
        this.user = {};
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
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser() {
    this.submitted = true;

    if (this.user.id) {
      this.users[this.findIndexById(this.user.id)] = this.user;
      this.usersService.updateUser(this.user);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'User Updated',
        life: 3000,
      });

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
    } else {
      this.user.password = this.createPassword();
      this.usersService.saveUser(this.user);
      this.users.push(this.user);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Product Created',
        life: 3000,
      });

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createPassword(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 7; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
