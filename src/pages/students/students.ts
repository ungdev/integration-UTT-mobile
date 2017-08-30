import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { StudentService } from '../../services/StudentService';

import { ProfilePage } from '../profile/profile';

@Component({
    templateUrl: 'students.html',
    providers: [StudentService]
})
export class StudentsPage {

    students: any[] = [];
    display: string;
    nameFilter: string;
    requestDone: boolean = false;
    totalDisplayed: number = 50;

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        private studentService: StudentService,
    ) {
        // get all the students
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
     * Increase the number of students to display
     */
    loadMore() {
        this.totalDisplayed += 100;
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
        let filtered = this.students;

        if (this.display === "newcomers") {
            filtered =  this.students.filter(student => student.is_newcomer);
        } else if (this.display === "students") {
            filtered = this.students.filter(student => !student.is_newcomer);
        }

        if (this.nameFilter && this.nameFilter.length > 2) {
            this.nameFilter = this.nameFilter.toLowerCase();
            filtered = filtered.filter(student => (student.first_name + " " + student.last_name).toLowerCase().includes(this.nameFilter));
        }

        return filtered.slice(0, this.totalDisplayed);
    }

}
