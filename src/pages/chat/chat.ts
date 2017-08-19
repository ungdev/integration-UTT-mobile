import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html'
})
export class ChatPage {

    requestDone: boolean = false;
    chatForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        private fb: FormBuilder,
    ) {
        this.requestDone = true;
        this.chatForm = this.fb.group({
            'message': [
                null,
                [Validators.required]
            ]
        });
    }

    sendMessage(data) {
        this.chatForm.reset();
    }

}
