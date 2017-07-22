import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';

import { TeamService } from '../../services/TeamService';

@Component({
    templateUrl: 'team.html',
    providers: [TeamService]
})
export class TeamPage {

    requestDone: boolean = false;
    team: object;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menu: MenuController,
        private teamService: TeamService,
    ) {
        const id = this.navParams.get('id');

        // get all the newcomers
        this.teamService.get({id})
            .subscribe(
                data => {
                    this.team = JSON.parse(data._body);
                    console.log(this.team);
                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            );
    }

}
