import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'authQRCode.html'
})
export class AuthQRCodePage {

    uri: string;

    constructor(
        public viewCtrl: ViewController,
        params: NavParams
    ) {
        this.uri = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + params.get('email');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
