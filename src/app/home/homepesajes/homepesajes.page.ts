import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  NavController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { FBservicesService } from "src/app/fbservices.service";
@Component({
  selector: 'app-homepesajes',
  templateUrl: './homepesajes.page.html',
  styleUrls: ['./homepesajes.page.scss'],
})
export class HomepesajesPage implements OnInit {

  constructor(
    private FB: FBservicesService,
    private router: Router,
    private navCtrl: NavController,
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  crearModal(){
    this.navCtrl.navigateForward('confirmarpesaje');
  }

}
