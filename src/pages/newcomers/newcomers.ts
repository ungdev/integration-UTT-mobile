import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { StudentService } from '../../services/StudentService';

@Component({
    selector: 'newcomers-profile',
    templateUrl: 'newcomers.html',
    providers: [StudentService]
})
export class NewcomersPage {

    requestDone: boolean = false;
    newcomers: object[] = [];

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        private studentService: StudentService,
    ) {
        this.studentService.get({filter: "newcomers"})
            .subscribe(
                data => {
                    this.newcomers = JSON.parse(data._body);
                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            );
    }

    private viewUser(user) {
        console.log(user);
    }

}
