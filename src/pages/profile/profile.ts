import { Component } from '@angular/core';
import { NavController, MenuController, NavParams, ModalController } from 'ionic-angular';

import { StudentService } from '../../services/StudentService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';

import { AuthQRCodePage } from '../authQRCode/authQRCode';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
    providers: [StudentService, AuthStorageHelper]
})
export class ProfilePage {

    requestDone: boolean = false;

    user: any;
    wei: object[] = [];
    medical: object[] = [];
    godfather: object[] = [];
    studies: object[] = [];
    contact: object[] = [];
    identity: object[] = [];

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        private navParams: NavParams,
        private studentService: StudentService,
        private authStorageHelper: AuthStorageHelper,
        public modalCtrl: ModalController,
    ) {

        const paramId = this.navParams.get('id');
        const userRoles = this.authStorageHelper.getUserRoles();
        const userId = this.authStorageHelper.getUserId();

        // if there is an id parameter, get the given user.
        // else, set id to 0 (to get the authenticated user)

        const id = paramId ? paramId : "0";

        this.studentService.get({id})
            .subscribe(
                data => {
                    const user = JSON.parse(data._body);
                    this.user = user;

                    // show these informations only if the user is admin or if the profile
                    // is the profile of the authenticated
                    if (userRoles['admin'] || id == userId || id === "0") {

                        this.wei = [
                            {label: "Payé", value: Boolean(user.wei_payment)},
                            {label: "Sandwich", value: Boolean(user.sandwich_payment)},
                            {label: "Caution", value: Boolean(user.guarantee_payment)},
                            {label: "Validé", value: Boolean(user.validated)}
                        ];

                        this.medical = [
                            {label: "Allergies", value: user.medical_allergies},
                            {label: "Allergies", value: user.medical_treatment},
                            {label: "Commentaire", value: user.medical_note},
                        ];

                    }

                    this.wei.push({label: "Participe", value: Boolean(user.wei)});

                    this.contact = [
                        {label: "Pays", value: user.country},
                        {label: "Code postal", value: user.postal_code},
                        {label: "Ville", value: user.city},
                        {label: "Téléphone", value: user.phone},
                        {label: "Email", value: user.email},
                    ];

                    this.studies = [
                        {label: "Numéro étudiant", value: user.student_id ? user.student_id : "nouveau" },
                        {label: "Branche", value: user.branch },
                        {label: "Semestre", value: user.level },
                    ];

                    this.identity = [
                        {label: "Prénom - nom", value: `${user.first_name} ${user.last_name}`},
                        {label: "Date de naissance", value: user.birth },
                        {label: "Sexe", value: user.sex == 1 ? "femme" : "homme" },
                        {label: "Team", value: user.team ? user.team.name : "aucune" },
                    ];

                    if (user.god_father) {
                        this.godfather = [
                            {label: "Prénom - nom", value: `${user.god_father.first_name} ${user.god_father.last_name}`},
                            {label: "Branche", value: user.god_father.branch},
                            {label: "Semestre", value: user.god_father.level},
                            {label: "Téléphone", value: user.god_father.phone},
                            {label: "Email", value: user.god_father.email},
                        ];
                    }

                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            );
    }

    showQRCode() {
        let modal = this.modalCtrl.create(AuthQRCodePage, {email: this.user.email});
        modal.present();
    }

}
