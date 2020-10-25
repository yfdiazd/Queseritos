import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { FBservicesService } from '../../fbservices.service';
import { from } from 'rxjs';

@Component({
  selector: "app-crearclientes",
  templateUrl: "./crearclientes.page.html",
  styleUrls: ["./crearclientes.page.scss"],
})
export class CrearclientesPage implements OnInit {
  //variables para agregar clientes
  tipoIdentificacion: string;
  numeroIdentificacionCliente: number;
  nombresCliente: string;
  apellidosCliente: string;
  empresaCliente: string;
  codigoCiudad: string;
  celularCliente: number;
  direccionCliente: string;
  correoCliente: string;
  //form: FormGroup; 
  //estos dos son para mostrar data
  @Input() nombreIdentificacionEdit;
  @Input() nombreCiudadEdit;
  //estos son los que se envian en el formulario
  @Input() tipoIdentificacionEdit;
  @Input() numeroIdentificacionClienteEdit;
  @Input() nombresClienteEdit;
  @Input() apellidosClienteEdit;
  @Input() empresaClienteEdit;
  @Input() codigociudadEdit;
  @Input() celularClienteEdit;
  @Input() direccionClienteEdit;
  @Input() correoClienteEdit;
  @Input() id;


  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private toastController: ToastController
    ) { }

  ngOnInit() { }


  customAlertOptions: any = {
    header: "Seleccione uno",
    translucent: true,
  };

  guardar() {
    if (this.id == undefined) {
      console.log("Entro a crear")
      if (this.tipoIdentificacionEdit == undefined || this.numeroIdentificacionClienteEdit == undefined || this.nombresClienteEdit == undefined || this.codigociudadEdit == undefined || this.celularClienteEdit == undefined || this.direccionClienteEdit == undefined || this.empresaClienteEdit == undefined) {
        this.toastCamposRequeridos();
      } else {
        this.FB.agregarCliente(this.tipoIdentificacionEdit, this.numeroIdentificacionClienteEdit, this.nombresClienteEdit.toUpperCase(), this.apellidosClienteEdit.toUpperCase(), this.empresaClienteEdit.toUpperCase(), this.codigociudadEdit, this.celularClienteEdit, this.direccionClienteEdit.toUpperCase(), this.correoClienteEdit.toUpperCase());
        this.modalCtrl.dismiss();
      }

    } else {
      console.log("Entro a MODIFICAR---")
      if (this.tipoIdentificacionEdit == "" || this.numeroIdentificacionClienteEdit == "" || this.nombresClienteEdit == "" || this.codigociudadEdit == "" || this.celularClienteEdit == "" || this.direccionClienteEdit == "" || this.empresaClienteEdit == "") {
        this.toastCamposRequeridos();
        console.log("No modificaste nada")
      } else {
        this.FB.updateCliente(this.id, this.tipoIdentificacionEdit, this.numeroIdentificacionClienteEdit, this.nombresClienteEdit.toUpperCase(), this.apellidosClienteEdit.toUpperCase(), this.empresaClienteEdit.toUpperCase(), this.codigociudadEdit, this.celularClienteEdit, this.direccionClienteEdit.toUpperCase(), this.correoClienteEdit.toUpperCase());
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

  // private buildForm(){
  // this.form= this.formBuilder.group({
  //   numeroIdentificacionClienteEdit: [0, Validators.max(15)]
  // })
  // }
}
