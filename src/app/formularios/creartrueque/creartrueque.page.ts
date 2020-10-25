import { Component, Input, NgModule, OnInit } from "@angular/core";
import { ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FBservicesService } from "../../fbservices.service";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-creartrueque',
  templateUrl: './creartrueque.page.html',
  styleUrls: ['./creartrueque.page.scss'],
})
export class CreartruequePage implements OnInit {
  proveedor = "fernanda";
  selectedFile = null;

  @Input()tipoAnticipoEdit;
  @Input()valorEdit;
  @Input() id1;
  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    // let id = this.route.snapshot.paramMap.get("id");

    // this.id = id;
    // console.log(" se recibe id: ", this.id);
    
  }

  guardar() {
    if (this.id1 == undefined) {
      console.log("Entro a crear anticipo")
      if (this.tipoAnticipoEdit == undefined || this.valorEdit == undefined) {
        this.toastCamposRequeridos();
      } else {
        this.FB.registrarAnticiposApesajeCompra("1602474514528","12345", this.tipoAnticipoEdit, this.valorEdit, "image");
        this.modalCtrl.dismiss();

      }

    } else {
      console.log("Entro a MODIFICAR---")
      if (this.tipoAnticipoEdit == "" || this.valorEdit == "") {
        this.toastCamposRequeridos();
        console.log("No modificaste nada")
      } else {
        this.FB.registrarAnticiposApesajeCompra("1602474514528","12345", this.tipoAnticipoEdit, this.valorEdit, "image");
        this.modalCtrl.dismiss();
      }
    }
  }


  volver() {
    this.modalCtrl.dismiss();
  }

  async toastCamposRequeridos() {
    const toast = await this.toastController.create({
      message: "Falta diligenciar campos requeridos.",
      cssClass: "toast",
      color: 'warning',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }
}



