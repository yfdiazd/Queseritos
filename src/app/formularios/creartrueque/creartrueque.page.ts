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

//   guardar() {
//     if (this.id == undefined) {
//       console.log("Entro a crear anticipo")
//       if (this.tipoAnticipoEdit == undefined || this.valorEdit == undefined || ) {
//         this.toastCamposRequeridos();
//       } else {
//         this.FB.agregarCliente(this.tipoAnticipoEdit, this.valorEdit, "image");
//         this.modalCtrl.dismiss();
//       }

//     } else {
//       console.log("Entro a MODIFICAR---")
//       if (this.tipoIdentificacionEdit == "" || this.numeroIdentificacionClienteEdit == "" || this.nombresClienteEdit == "" || this.codigociudadEdit == "" || this.celularClienteEdit == "" || this.direccionClienteEdit == "" || this.empresaClienteEdit == "") {
//         this.toastCamposRequeridos();
//         console.log("No modificaste nada")
//       } else {
//         this.FB.updateCliente(this.id, this.tipoIdentificacionEdit, this.numeroIdentificacionClienteEdit, this.nombresClienteEdit, this.apellidosClienteEdit, this.empresaClienteEdit, this.codigociudadEdit, this.celularClienteEdit, this.direccionClienteEdit, this.correoClienteEdit);
//         this.modalCtrl.dismiss();
//       }
//     }
//   }

//   volver() {
//     this.modalCtrl.dismiss();
//   }

//   async toastCamposRequeridos() {
//     const toast = await this.toastController.create({
//       message: "Falta diligenciar campos requeridos.",
//       cssClass: "toast",
//       color: 'warning',
//       position: 'middle',
//       duration: 5000
//     });
//     toast.present();
//   }
// }

// 
}
