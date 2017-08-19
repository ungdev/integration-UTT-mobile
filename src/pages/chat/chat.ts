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
                    console.log("messages", this.messages);
                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            );
    }

    sendMessage(data) {
        this.messageService.post({text: data.message, channel: "general"})
            .subscribe(
                data => {
                    console.log("messages", JSON.parse(data._body));
                    this.chatForm.reset();
                },
                err => console.log("err : ", err)
            );
    }

}
