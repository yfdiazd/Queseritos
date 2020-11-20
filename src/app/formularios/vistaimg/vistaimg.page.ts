import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';

@Component({
  selector: 'app-vistaimg',
  templateUrl: './vistaimg.page.html',
  styleUrls: ['./vistaimg.page.scss'],
})
export class VistaimgPage implements OnInit {

  constructor(
    private FB: FBservicesService,
    private modalController: ModalController
  ) { }
  ngOnInit() {
  }
  volver() {
    this.modalController.dismiss();
  }


}
