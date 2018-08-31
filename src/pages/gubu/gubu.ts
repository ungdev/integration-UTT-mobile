import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { File } from '@ionic-native/file';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';

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
        private file: File,
        private transfer: FileTransfer,
        private platform: Platform

    ) {
        // Pull gubu part content
        this.downloadAndOpenPdf()
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

  downloadAndOpenPdf() {
    let path = null;
  
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    }
  
    const transfer = this.transfer.create();
    transfer.download('https://devdactic.com/html/5-simple-hacks-LBT.pdf', path + 'myfile.pdf').then(entry => {
      let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf', {});
    });
  }

}
