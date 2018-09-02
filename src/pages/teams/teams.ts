import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { TeamService } from '../../services/TeamService';

import { TeamPage } from '../team/team';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
    templateUrl: 'teams.html',
    providers: [TeamService]
})
export class TeamsPage {

    requestDone: boolean = false;
    teams: any[] = [];

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        private teamService: TeamService,
        private ga: GoogleAnalytics,
    ) {
        // get all the newcomers
        this.teamService.get()
            .subscribe(
                data => {
                    this.teams = JSON.parse(data._body);
                    console.log(this.teams);
                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            );
    }

    ionViewDidEnter(){
      this.ga.trackView('teams')
    }

    /**
     * navigate to the profile page of the user given in parameter
     *
     * @param integer id : the student id
     */
    viewTeam(id) {
        this.navCtrl.push(TeamPage, {id});
    }

}
