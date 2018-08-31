import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DocumentViewer } from '@ionic-native/document-viewer';

import { GubuService } from '../../services/GubuService';

import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';

@Component({
    selector: 'page-gubu',
    templateUrl: 'gubu.html',
    providers: [GubuService]
})
export class GubuPage {

    id: number = 0;
    html: string = "";
    requestDone: boolean = false;

    @ViewChild(Content) content: Content;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private fb: FormBuilder,
        private gubuService: GubuService,
        private authStorageHelper: AuthStorageHelper,
        private iab: InAppBrowser,
        private document: DocumentViewer,
    ) {
        // Pull gubu part content
        this.id = navParams.get('id');
        this.gubuService.get({id: this.id})
            .subscribe(
                data => {
                    this.html = data._body;
                    this.requestDone = true;
                },
                err => console.log("Gubu part loading error: ", err)
            );
        

    }

    // scrollToBottom() {
    //     let dimensions = this.content.getContentDimensions();
    //     this.content.scrollTo(0, dimensions.scrollHeight+100, 100);
    // }


    // channelChanged() {
    // }

    /**
     * When leaving this page, clear the refreshInterval
     */
    // ionViewWillLeave() {
    // }

    // goToSlack() {
    //     this.iab.create('http://bde-utt.slack.com')
    // }

}
