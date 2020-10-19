import { Component, Input, NgModule, OnInit } from "@angular/core";
import { ModalController, ToastController } from '@ionic/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FBservicesService } from "../../fbservices.service";
@Component({
  selector: 'app-creartrueque',
  templateUrl: './creartrueque.page.html',
  styleUrls: ['./creartrueque.page.scss'],
})
export class CreartruequePage implements OnInit {
  proveedor = "fernanda";
  @Input()tipoAnticipoEdit;
  @Input()valorEdit;
  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

}
