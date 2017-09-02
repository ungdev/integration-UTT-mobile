import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

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
        private toastCtrl: ToastController
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

        this.notificationService.post(data)
            .subscribe(
                data => {
                    this.notificationForm.reset();
                    let toast = this.toastCtrl.create({
                        message: "Notification envoyée !",
                        duration: 3000
                    });
                    toast.present();
                },
                err => {
                    let toast = this.toastCtrl.create({
                        message: "Erreur lors de l'envoi.",
                        duration: 3000
                    });
                    toast.present();
                }
            );
    }

}
