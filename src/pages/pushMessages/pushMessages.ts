import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from '../../services/NotificationService';

@Component({
    templateUrl: 'pushMessages.html',
    providers: [NotificationService]
})
export class PushMessagesPage {

    notificationForm: FormGroup;

    constructor(
        private notificationService: NotificationService,
        private fb: FormBuilder,
    ) {
        this.notificationForm = this.fb.group({
            'title': [
                null,
                [Validators.required]
            ],
            'message': [
                null,
                [Validators.required]
            ],
            'target' : []
        });
    }

    sendNotification(data) {
        if (!this.notificationForm.valid) return;

        const notification = {
            title: data.title,
            message: data.message
        };

        this.notificationService.post(notification, "send_to_all")
        .subscribe(
            data => {
                console.log(data);
            },
            err => console.log("err : ", err)
        );
    }

}
