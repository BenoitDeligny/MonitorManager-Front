import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Monitor } from '../shared/models/monitor';
import { MonitorsService } from './services/monitors.service';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss'],
  providers: [MessageService, ConfirmationService],
  encapsulation: ViewEncapsulation.None,
})
export class MonitorsComponent implements OnInit, OnDestroy {
  // * Mise en place des subscriptions afin de pouvoir unsubscribe
  subscription1$: Subscription;

  monitors: Monitor[];
  monitor: Monitor;
  selectedMonitors: Monitor[];
  monitorDialog: boolean;
  submitted: boolean;

  constructor(
    private monitorsService: MonitorsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.subscription1$ = this.monitorsService
      .getAllMonitors()
      .subscribe((data) => {
        this.monitors = data;
      });
  }

  ngOnDestroy() {
    this.subscription1$.unsubscribe();
  }

  openNew() {
    this.monitor = {};
    this.submitted = false;
    this.monitorDialog = true;
  }

  deleteSelectedMonitors() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected monitors?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.monitors = this.monitors.filter(
          (val) => !this.selectedMonitors.includes(val)
        );
        for (const monitor of this.selectedMonitors) {
          this.monitorsService.deleteMonitor(monitor.id);
        }
        this.selectedMonitors = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Monitors Deleted',
          life: 3000,
        });
      },
    });
  }

  editMonitor(monitor: Monitor) {
    this.monitor = { ...monitor };
    this.monitorDialog = true;
  }

  deleteMonitor(monitor: Monitor) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + monitor.reference + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.monitors = this.monitors.filter((val) => val.id !== monitor.id);
        this.monitorsService.deleteMonitor(monitor.id);
        this.monitor = {};
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
    this.monitorDialog = false;
    this.submitted = false;
  }

  saveMonitor() {
    this.submitted = true;

    if (this.monitor.id) {
      this.monitors[
        this.findIndexById(this.monitor.id.toString())
      ] = this.monitor;
      this.monitorsService.updateMonitor(this.monitor);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Monitor Updated',
        life: 3000,
      });

      this.monitors = [...this.monitors];
      this.monitorDialog = false;
      this.monitor = {};
    } else {
      this.monitorsService.saveMonitor(this.monitor);
      this.monitors.push(this.monitor);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Product Created',
        life: 3000,
      });

      this.monitors = [...this.monitors];
      this.monitorDialog = false;
      this.monitor = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.monitors.length; i++) {
      if (this.monitors[i].id === +id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
