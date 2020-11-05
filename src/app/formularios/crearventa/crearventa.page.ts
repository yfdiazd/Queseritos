import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-crearventa',
  templateUrl: './crearventa.page.html',
  styleUrls: ['./crearventa.page.scss'],
})
export class CrearventaPage implements OnInit {

  constructor(private modalCtrl: ModalController) {
    
   }

  ngOnInit() {
  }
  volver(){
    this.modalCtrl.dismiss();
  }

}
