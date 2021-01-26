import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Monitor } from '../../shared/models/monitor';

@Injectable({
  providedIn: 'root',
})
export class MonitorsService {
  constructor(private http: HttpClient) {}

  getAllMonitors(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(environment.localUrl + 'monitors');
  }

  saveMonitor(monitor: Monitor) {
    this.http.post(environment.localUrl + 'monitors', monitor).subscribe();
  }

  updateMonitor(monitor: Monitor) {
    this.http.put(environment.localUrl + 'monitors', monitor).subscribe();
  }

  deleteMonitor(id: number): void {
    this.http.delete(environment.localUrl + `monitors/${id}`).subscribe();
  }
}
