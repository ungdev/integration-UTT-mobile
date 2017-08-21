import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StudentService } from '../../services/StudentService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';

@Component({
    templateUrl: 'location.html',
    providers: [StudentService, AuthStorageHelper]
})
export class LocationPage {

    requestDone: boolean = false;
    students: any[] = [];
    authId: string;

    constructor(
        public navCtrl: NavController,
        public studentService: StudentService,
        public authStorageHelper: AuthStorageHelper,
    ) {
        this.authId = this.authStorageHelper.getUserId();

        // get all the admins
        this.studentService.get({filters: [{admin: 100}]})
            .subscribe(
                data => {
                    this.students = JSON.parse(data._body);
                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            );
    }

}
