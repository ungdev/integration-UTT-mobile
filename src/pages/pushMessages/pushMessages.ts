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
            'targets' : []
        });
    }

    sendNotification(data) {
        if (!this.notificationForm.valid) return;

        console.log(data);
        this.notificationService.post(data)
            .subscribe(
                data => {
                    console.log(data);
                },
                err => console.log("err : ", err)
            );
    }

}
