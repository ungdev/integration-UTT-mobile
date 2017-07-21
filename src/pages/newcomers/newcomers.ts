import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { StudentService } from '../../services/StudentService';

import { ProfilePage } from '../profile/profile';

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
        // get all the newcomers
        this.studentService.get({filter: "newcomers"})
            .subscribe(
                data => {
                    this.newcomers = JSON.parse(data._body);
                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            );
    }

    /**
     * navigate to the profile page of the user given in parameter
     *
     * @param integer id : the student id
     */
    private viewUser(id) {
        this.navCtrl.push(ProfilePage, {id});
    }

}
