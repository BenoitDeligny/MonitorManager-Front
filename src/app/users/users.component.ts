import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Role } from '../shared/models/role';
import { User } from '../shared/models/user';
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
  usersSubscription$: Subscription;
  rolesSubscription$: Subscription;

  users: User[];
  roles: Role[];
  selectedRole: Role;
  user: User;
  selectedUsers: User[];
  userDialog: boolean;
  submitted: boolean;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.usersSubscription$ = this.usersService
      .getAllUsers()
      .subscribe((data) => {
        this.users = data;
      });

    this.rolesSubscription$ = this.usersService.getRoles().subscribe((data) => {
      this.roles = data;
      this.selectedRole = this.roles[2];
    });
  }

  ngOnDestroy() {
    this.usersSubscription$.unsubscribe();
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

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.lastname + '?',
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
      this.user.role = {
        id: this.selectedRole.id,
        name: this.selectedRole.name,
      };
      this.users[this.findIndexById(this.user.id.toString())] = this.user;
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
      this.user.role = {
        id: this.selectedRole.id,
        name: this.selectedRole.name,
      };
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
      if (this.users[i].id === +id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
