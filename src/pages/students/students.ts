import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { StudentService } from '../../services/StudentService';

import { ProfilePage } from '../profile/profile';

@Component({
    templateUrl: 'students.html',
    providers: [StudentService]
})
export class StudentsPage {

    requestDone: boolean = false;
    students: any[] = [];
    display: string;

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        private studentService: StudentService,
    ) {
        // get all the newcomers
        this.studentService.get()
            .subscribe(
                data => {
                    this.students = JSON.parse(data._body);
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
    viewUser(id) {
        this.navCtrl.push(ProfilePage, {id});
    }

    /**
     * Filter this.students with this.display value
     *
     * @return array
     */
    filteredStudents() {
        if (this.display === "newcomers") return this.students.filter(student => student.is_newcomer);
        if (this.display === "students") return this.students.filter(student => !student.is_newcomer);
        return this.students;
    }

}
