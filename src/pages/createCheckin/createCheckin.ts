import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CheckinService } from '../../services/CheckinService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';
import { CheckinPage } from '../checkin/checkin';

@Component({
    templateUrl: 'createCheckin.html',
    providers: [CheckinService, AuthStorageHelper]
})
export class CreateCheckinPage {

    checkinForm: FormGroup;

    constructor(
        private checkinService: CheckinService,
        private fb: FormBuilder,
    ) {
        this.checkinForm = this.fb.group({
            'name': [
                null,
                [Validators.required]
            ]
        });
    }

    submitCheckinForm(data) {
        if (!this.checkinForm.valid) return;

        this.checkinService.post({name: data.name})
            .subscribe(
                data => {
                    const parsedData = JSON.parse(data._body);
                },
                err => console.log("err : ", err)
            )
    }

}
