import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MessageService } from '../../services/MessageService';

import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

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

    @ViewChild(Content) content: Content;

    constructor(
        public navCtrl: NavController,
        private fb: FormBuilder,
        private messageService: MessageService,
        private authStorageHelper: AuthStorageHelper,
        private iab: InAppBrowser,
        private ga: GoogleAnalytics,
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
    ionViewDidEnter(){
      this.ga.trackView('chat')
    }

    scrollToBottom() {
        let dimensions = this.content.getContentDimensions();
        this.content.scrollTo(0, dimensions.scrollHeight+100, 100);
    }

    sendMessage(data) {
        this.messageService.post({text: data.message, channel: this.activeChannel})
            .subscribe(
                data => {
                    this.messages.push(JSON.parse(data._body));
                    this.chatForm.reset();
                    this.scrollToBottom();
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
                    this.scrollToBottom();
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

    goToSlack() {
        this.iab.create('http://bde-utt.slack.com')
    }

}
