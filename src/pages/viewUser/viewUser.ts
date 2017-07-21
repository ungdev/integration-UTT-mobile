import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';

import { StudentService } from '../../services/StudentService';

@Component({
    selector: 'view-user-page',
    templateUrl: 'viewUser.html',
    providers: [StudentService]
})
export class ViewUserPage {

    requestDone: boolean = false;

    user: any;
    referral: any;
    wei: object[];

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        private navParams: NavParams,
        private studentService: StudentService,
    ) {
        // 0 to tell that we want to get the auth user (we don't have his id)
        this.studentService.get({id: navParams.get('id')})
            .subscribe(
                data => {
                    this.user = JSON.parse(data._body);

                    console.log(this.user);

                    this.wei = [
                        {label: "Participe", value: Boolean(this.user.wei)},
                        {label: "Payé", value: Boolean(this.user.wei_payment)},
                        {label: "Sandwich", value: Boolean(this.user.sandwich_payment)},
                        {label: "Caution", value: Boolean(this.user.guarantee_payment)},
                        {label: "Validé", value: Boolean(this.user.validated)}
                    ];

                    this.referral = {
                        lastname: this.user.referral_info.last_name,
                        firstname: this.user.referral_info.first_name,
                        branch: this.user.referral_info.branch,
                        level: this.user.referral_info.level,
                        phone: this.user.referral_info.phone,
                        email: this.user.referral_info.email,
                    }

                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            );
    }

}
