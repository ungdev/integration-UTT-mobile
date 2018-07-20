import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { StudentService } from '../../services/StudentService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';
import { PlatformHelper } from '../../helpers/PlatformHelper';

/*import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';*/

@Component({
    selector: 'page-location',
    templateUrl: 'location.html',
    providers: [StudentService, AuthStorageHelper]
})
export class LocationPage {

    requestDone: boolean = false;
    students: any[] = [];
    authId: string;
    map: any;

    constructor(
        public navCtrl: NavController,
        public studentService: StudentService,
        public authStorageHelper: AuthStorageHelper,
        public platformHelper: PlatformHelper,
        public platform: Platform,
        //private googleMaps: GoogleMaps
    ) {
        this.authId = this.authStorageHelper.getUserId();

        // get all the admins
        this.studentService.get({filters: {admin: 100}})
            .subscribe(
                data => {
                    this.students = JSON.parse(data._body);
                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            );
    }

    ionViewDidLoad() {
        if (this.platformHelper.isMobile(this.platform)) {
            setTimeout(()=>{
                this.loadMap();
            }, 1000)
        }
    }

    loadMap() {
        //this.map = new GoogleMap('map');

       /* this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });*/
    }

}
