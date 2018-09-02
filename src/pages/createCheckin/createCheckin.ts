import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';

import { CheckinService } from '../../services/CheckinService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
    templateUrl: 'createCheckin.html',
    providers: [CheckinService, AuthStorageHelper]
})
export class CreateCheckinPage {

    checkinForm: FormGroup;

    constructor(
        private checkinService: CheckinService,
        private fb: FormBuilder,
        public viewCtrl: ViewController,
        private ga: GoogleAnalytics,
    ) {
        this.checkinForm = this.fb.group({
            'name': [
                null,
                [Validators.required]
            ]
        });
    }
    ionViewDidEnter(){
      this.ga.trackView('createCheckin')
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    submitCheckinForm(data) {
        if (!this.checkinForm.valid) return;

        this.checkinService.post({name: data.name})
            .subscribe(
                data => {
                    const checkin = JSON.parse(data._body);
                    this.viewCtrl.dismiss(checkin);
                },
                err => console.log("err : ", err)
            )
    }

}
