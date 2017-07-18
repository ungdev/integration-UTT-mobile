import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
    providers: []
})
export class ProfilePage {

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
    ) {}

}
