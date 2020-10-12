import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';
import { CrearclientesPage } from 'src/app/formularios/crearclientes/crearclientes.page';

@Component({
  selector: 'app-homeclientes',
  templateUrl: './homeclientes.page.html',
  styleUrls: ['./homeclientes.page.scss'],
})
export class HomeclientesPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private FB: FBservicesService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async editarModal(lista) {

    console.log("Esta es la ciudad:", lista.idCiudad)
    console.log("Esta es la identificación:", lista.idTipoIdentificacion)
    const modal = await this.modalController.create({
      component: CrearclientesPage,
      cssClass: "my-custom-class",
      componentProps: {
        tipoIdentificacionEdit: lista.idTipoIdentificacion,
        numeroIdentificacionClienteEdit: lista.numIndetificacion,
        nombresClienteEdit: lista.nombres,
        apellidosClienteEdit: lista.apellidos,
        empresaClienteEdit: lista.empresa,
        codigociudadEdit: lista.idCiudad,
        celularClienteEdit: lista.celular,
        direccionClienteEdit: lista.direccion,
        correoClienteEdit: lista.correo,
        id: lista.id,
      },
    });
    console.log("estos son los datos enviados codigoIdentificacionEdit:",
      "\n tipo id:", lista.idTipoIdentificacion,
      "\n numeroIdentificacionClienteEdit:", lista.numIndetificacion,
      "\n nombresClienteEdit:", lista.nombres,
      "\n apellidosClienteEdit:", lista.apellidos,
      "\n empresaClienteEdit:", lista.empresa,
      "\n celularClienteEdit:", lista.celular,
      "\n direccionClienteEdit:", lista.direccion,
      "\n correoClienteEdit:", lista.correo)
    return await modal.present();
  }

  async crearModal() {
    const modal = await this.modalController.create({
      component: CrearclientesPage,
      cssClass: "my-custom-class"
    });
    return await modal.present();
  }

  async eliminar(lista) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Espera",
      message: "¿Esta seguro de eliminar " + lista.nombres + "?",
      buttons: [
        {
          text: "CANCELAR",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "SI",
          handler: () => {
            console.log("Confirm Okay");
            this.FB.deleteCliente(lista.id);
          },
        },
      ],
    });

    await alert.present();
  }

  async cerrar() {
    this.navCtrl.navigateForward('main-menu');
  }


}
