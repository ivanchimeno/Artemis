import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/shared/notification/notification.service';
import { User } from 'app/core/user/user.model';
import { AccountService } from 'app/core/auth/account.service';
import { Notification } from 'app/entities/notification.model';
import * as moment from 'moment';

type NotificationUIState = {
    notification: Notification;
    icon: string;
    visible: boolean;
};

@Component({
    selector: 'jhi-notification-popup',
    templateUrl: './notification-popup.component.html',
    styleUrls: ['./notification-popup.scss'],
})
export class NotificationPopupComponent implements OnInit {
    notifications: NotificationUIState[] = [
        {
            notification: { id: 1, title: 'Quiz just started', text: 'Lorem ipsum dolor sit amet, consetetur sadipscing.' } as Notification,
            icon: 'check-double',
            visible: true,
        },
    ];

    constructor(private accountService: AccountService, private notificationService: NotificationService) {}

    /**
     * Subscribe to notification updates that are received via websocket if the user is logged in.
     */
    ngOnInit(): void {
        this.accountService.getAuthenticationState().subscribe((user: User | null) => {
            if (user) {
                this.subscribeToNotificationUpdates();
            }
        });
    }

    close(index: number) {
        console.log(index);
        console.log(this.notifications[index]);
        this.notifications[index].visible = false;
        console.log(this.notifications[index]);
    }

    private subscribeToNotificationUpdates(): void {
        setTimeout(() => {
            this.notificationService.subscribeUserNotifications(); // TODO: listen here too? Maybe remove for now
        }, 500);
        this.notificationService.subscribeToSocketMessages().subscribe((receivedNotification: Notification) => {
            if (receivedNotification && receivedNotification.notificationDate) {
                this.addNotification(receivedNotification);
            }
        });
    }

    private addNotification(receivedNotification: Notification): void {
        receivedNotification.notificationDate = moment(receivedNotification.notificationDate);
        if (!this.notifications.some(({ notification }) => notification.id === receivedNotification.id)) {
            // TODO: only add if it is a notification about quiz exercise start
            this.notifications.unshift({ notification: receivedNotification, icon: 'check-double', visible: false });
        }
    }
}