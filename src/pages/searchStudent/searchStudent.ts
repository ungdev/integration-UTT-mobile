import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { StudentService } from '../../services/StudentService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';

@Component({
    templateUrl: 'searchStudent.html',
    providers: [StudentService, AuthStorageHelper]
})
export class SearchStudentPage {

    students: any[] = [];

    constructor(
        public viewCtrl: ViewController,
        public params: NavParams,
        private studentService: StudentService
    ) {}

    /**
     * Handle changes in the search input
     * Make the autocomplete request only if there are at
     * least 3 characters in the input
     *
     - @param object event
     */
    search(event: any) {
        const name = event.target.value;
        if (name.length > 2) {
            this.studentService.autocomplete(name)
                .subscribe(
                    data => {
                        this.students = JSON.parse(data._body);
                        console.log(this.students);
                    },
                    err => console.log("autocomplete err", err)
                );
        } else {
            this.students = [];
        }
    }

    /**
     * Close the modal.
     *
     * @param object student : the selected student or empty object
     */
    dismiss(student = {}) {
        this.viewCtrl.dismiss(student);
    }

}
