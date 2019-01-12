import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-online-status',
  templateUrl: './online-status.component.html',
  styleUrls: ['./online-status.component.css']
})
export class OnlineStatusComponent implements OnInit {

  private onlineStatus: Observable<Event>;
  private offlineStatus: Observable<Event>;


  constructor(
    private notifService: NotificationsService,
  ) { }

  ngOnInit() {
    this.onlineStatus = fromEvent(window, 'online');
    this.offlineStatus = fromEvent(window, 'offline');
    this.onlineStatus.subscribe(() => this.notifService.info('You are online', `${new Date()}`));
    this.offlineStatus.subscribe(() => this.notifService.error('You are offline', `${new Date()}`, {
      timeOut: 0,
      showProgressBar: false,
      clickToClose: true,
    }));
  }

}
