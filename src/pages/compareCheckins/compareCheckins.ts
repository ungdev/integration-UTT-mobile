import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'compareCheckins.html'
})
export class CompareCheckinsPage {

    first: any;
    second: any;

    constructor(
        public viewCtrl: ViewController,
        params: NavParams
    ) {
        this.first = params.get('first');
        this.second = params.get('second');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
