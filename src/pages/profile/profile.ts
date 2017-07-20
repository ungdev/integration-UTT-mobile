import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { StudentService } from '../../services/StudentService';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
    providers: [StudentService]
})
export class ProfilePage {

    requestDone: boolean = false;

    firstname: string;
    lastname: string;
    branch: string;
    wei: object[];
    referral: object;

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        private studentService: StudentService,
    ) {
        // 0 to tell that we want to get the auth user (we don't have his id)
        this.studentService.get({id: "0"})
            .subscribe(
                data => {
                    const parsedData = JSON.parse(data._body);
                    this.extractData(parsedData);
                },
                err => console.log("err : ", err)
            );
    }

    private extractData(data) {
        this.firstname = data.first_name;
        this.lastname = data.last_name;
        this.branch = data.branch,

        this.wei = [
            {label: "Participe", value: Boolean(data.wei)},
            {label: "Payé", value: Boolean(data.wei_payment)},
            {label: "Sandwich", value: Boolean(data.sandwich_payment)},
            {label: "Caution", value: Boolean(data.guarantee_payment)},
            {label: "Validé", value: Boolean(data.validated)}
        ];

        this.referral = {
            lastname: data.referral_info.last_name,
            firstname: data.referral_info.first_name,
            branch: data.referral_info.branch,
            level: data.referral_info.level,
            phone: data.referral_info.phone,
            email: data.referral_info.email,
        }

        this.requestDone = true;
    }

}
