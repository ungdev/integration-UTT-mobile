import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from '../../services/MessageService';

import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
    providers: [MessageService]
})
export class ChatPage {

    chatForm: FormGroup;
    messages: any[] = [];
    refreshInterval: any;
    activeChannel: string = "general";
    canAdminChannel: boolean = false;
    authUserId: string;

    constructor(
        public navCtrl: NavController,
        private fb: FormBuilder,
        private messageService: MessageService,
        private authStorageHelper: AuthStorageHelper,
    ) {
        this.chatForm = this.fb.group({
            'message': [
                null,
                [Validators.required]
            ]
        });

        // check if the auth user can access to admin channel
        const roles = authStorageHelper.getUserRoles();
        if (roles['admin'] || roles['orga']) {
            this.canAdminChannel = true;
            this.authUserId = authStorageHelper.getUserId();
        }

        this.refreshInterval = setInterval(this.refreshMessages.bind(this), 5000);
        this.refreshMessages();

    }

    sendMessage(data) {
        this.messageService.post({text: data.message, channel: this.activeChannel})
            .subscribe(
                data => {
                    this.messages.push(JSON.parse(data._body));
                    this.chatForm.reset();
                },
                err => console.log("err : ", err)
            );
    }

    /**
     * Get the messages of the active channel
     */
    refreshMessages() {
        this.messageService.get({filters: {channel: this.activeChannel}})
            .subscribe(
                data => {
                    this.messages = JSON.parse(data._body);
                },
                err => console.log("err : ", err)
            )
    }

    channelChanged() {
        this.refreshMessages();
    }

    /**
     * When leaving this page, clear the refreshInterval
     */
    ionViewWillLeave() {
        clearInterval(this.refreshInterval);
    }

}
