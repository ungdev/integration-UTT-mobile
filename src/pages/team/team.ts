import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { TeamService } from '../../services/TeamService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';

import { ProfilePage } from '../profile/profile';

@Component({
    templateUrl: 'team.html',
    providers: [TeamService, AuthStorageHelper]
})
export class TeamPage {

    requestDone: boolean = false;
    team: object;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menu: MenuController,
        private teamService: TeamService,
        private authStorageHelper: AuthStorageHelper,
        private iab: InAppBrowser,
    ) {
        let id = this.navParams.get('id');

        if (!id) {
            id = this.authStorageHelper.getUserTeamId();
        }
        console.log(id);
        // get all the newcomers
        this.teamService.get({id})
            .subscribe(
                data => {
                    this.team = JSON.parse(data._body);
                    console.log(this.team);
                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            )
    }

    /**
     * navigate to the profile page of the user given in parameter
     *
     * @param integer id : the student id
     */
    viewUser(id) {
        this.navCtrl.push(ProfilePage, {id});
    }
    openFacebook(url) {
      this.iab.create(url)
    }

    isAdmin() {
        const roles = this.authStorageHelper.getUserRoles()
        return roles['admin']
    }

}
