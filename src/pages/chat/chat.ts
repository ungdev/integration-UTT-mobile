import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from '../../services/MessageService';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
    providers: [MessageService]
})
export class ChatPage {

    requestDone: boolean = false;
    chatForm: FormGroup;
    messages: any[];
    refreshInterval: any;

    constructor(
        public navCtrl: NavController,
        private fb: FormBuilder,
        private messageService: MessageService,
    ) {
        this.chatForm = this.fb.group({
            'message': [
                null,
                [Validators.required]
            ]
        });

        this.messageService.get()
            .subscribe(
                data => {
                    this.messages = JSON.parse(data._body);
                    this.requestDone = true;
                    this.refreshMessages();
                },
                err => console.log("err : ", err)
            );
    }

    sendMessage(data) {
        this.messageService.post({text: data.message, channel: "general"})
            .subscribe(
                data => {
                    this.chatForm.reset();
                },
                err => console.log("err : ", err)
            );
    }

    /**
     * Create an interval and store it in this.refreshInterval.
     * On each interation, refresh this.messages
     */
    refreshMessages() {
        this.refreshInterval = setInterval(_ => {
            this.messageService.get()
                .subscribe(
                    data => {
                        this.messages = JSON.parse(data._body);
                    },
                    err => console.log("err : ", err)
                )
        }, 5000);
    }

    /**
     * When leaving this page, clear the refreshInterval
     */
    ionViewWillLeave() {
        clearInterval(this.refreshInterval);
    }

}
