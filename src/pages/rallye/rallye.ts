import { Component } from '@angular/core';
import { ToastController, SelectPopover } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

import { TeamService } from '../../services/TeamService';
import { AuthStorageHelper } from '../../helpers/AuthStorageHelper';
import { ENV } from '../../config/env.dev';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
    templateUrl: 'rallye.html',
    providers: [AuthStorageHelper, TeamService]
})
export class RallyePage {

    rallyeForm: FormGroup
    requestDone: boolean = false
    teams: any[] = []
    team1: any
    team2: any
    stand: any = null
    selection1: any
    selection2: any
    selectTeam1: any
    selectTeam2: any

    constructor(
        private teamService: TeamService,
        private fb: FormBuilder,
        private toastCtrl: ToastController,
        private authStorageHelper:AuthStorageHelper,
        private ga: GoogleAnalytics,
    ) {
      this.selection1 = "draw"
      this.selection2 = "draw"
      this.team1 = {name: "Equipe 1"}
      this.team2 = {name: "Equipe 2"}
        this.rallyeForm = this.fb.group({
            'team1': [
                null,
                [Validators.required]
            ],
            'team2': [
                null,
                [Validators.required]
            ],
        });

        this.teamService.get()
            .subscribe(
                data => {
                    this.teams = JSON.parse(data._body)
                    console.log(this.teams)
                    this.teams.sort((a, b) => {
                      if(a.name < b.name) return -1
                      if(a.name > b.name) return 1
                      return 0
                  })
                    this.requestDone = true;
                },
                err => console.log("err : ", err)
            )
    }

    ionViewDidEnter(){
      this.ga.trackView('rallye')
    }

    onTeamChange(teamNumber) {
      console.log('onteamchange', teamNumber)
      let tm
      if(teamNumber === 1) tm = this.selectTeam1
      if(teamNumber === 2) tm = this.selectTeam2
      const team = this.teams.find(e => e.id == tm)
      console.log('onteamchange team', team)
      if(teamNumber === 1) this.team1 = team
      if(teamNumber === 2) this.team2 = team
    }

    select1Change() {
      console.log('stand :', this.stand)
      switch(this.selection1){
        case "victory":
          this.selection2 = "defeat"
          break
        case "defeat":
          this.selection2 = "victory"
          break
        default:
          this.selection2 = this.selection1
          break
      }
    }
    select2Change() {
      switch(this.selection2){
        case "victory":
          this.selection1 = "defeat"
          break
        case "defeat":
          this.selection1 = "victory"
          break
        default:
          this.selection1 = this.selection2
          break
      }
    }

    sendResult(data) {
        console.log('validation', data)
        if(this.stand === null) {
          let toast = this.toastCtrl.create({
            message: "Choisissez un stand",
            duration: 2000
          })
          toast.present();
          return
        }
        if (!this.rallyeForm.valid) {
          let toast = this.toastCtrl.create({
            message: "Informations manquantes",
            duration: 2000
          })
          toast.present();
          return
        }
        if(this.team1.id === this.team2.id) {
          let toast = this.toastCtrl.create({
            message: "Vous avez choisit deux fois la même équipe",
            duration: 2000
          })
          toast.present();
          return
        }

        
        if (this.selection1 === "draw") {
          this.sendResultToApi(this.team1, 'E')
          this.sendResultToApi(this.team2, 'E')
        }
        if (this.selection1 === "victory") {
          this.sendResultToApi(this.team1, 'V')
          this.sendResultToApi(this.team2, 'D')
        }
        if (this.selection1 === "defeat") {
          this.sendResultToApi(this.team1, 'D')
          this.sendResultToApi(this.team2, 'V')
        }
        let toast = this.toastCtrl.create({
          message: "Résultats envoyés !",
          duration: 3000,
          position: 'bottom'
        })
        toast.present()

        this.rallyeForm.reset();
        this.selection1 = "draw"
        this.selection2 = "draw"
        this.team1 = {name: "Equipe 1"}
        this.team2 = {name: "Equipe 2"}
    }

    sendResultToApi(team, result) {
      const accessToken = this.authStorageHelper.getAccessToken();
      const api = axios.create({ baseURL: ENV.BACKEND_API_URL });
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      api
          .post(`rallye/${team.id}`, { params: {
            user: this.authStorageHelper.getUserId(), // who is sending the result
            stand: this.stand,
            result: result,
          }})
          .then((res) => {
            console.log('result : ', res)
          })
          .catch((err) => {
            console.error(err)
            let toast = this.toastCtrl.create({
              message: `erreur ${err.message}`,
              duration: 3000,
              position: 'bottom'
            })
            toast.present()
          });
    }

}
