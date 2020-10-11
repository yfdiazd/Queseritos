import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';
import { CrearclientesPage } from 'src/app/formularios/crearclientes/crearclientes.page';

@Component({
  selector: 'app-homeclientes',
  templateUrl: './homeclientes.page.html',
  styleUrls: ['./homeclientes.page.scss'],
})
export class HomeclientesPage implements OnInit {

  constructor(
    private FB: FBservicesService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async editarModal(lista) {
    const modal = await this.modalController.create({
      component: CrearclientesPage,
      cssClass: "my-custom-class",
      componentProps: {
        id: lista.id,
        apellidos: lista.apellidos,
        nombres: lista.nombres,
        celular: lista.celular,
        correo: lista.correo,
        direccion: lista.direccion,
        empresa: lista.empresa,
        ciudad: lista.idCiudad,
        identificacion: lista.idIdentificacion,
        numeroIdentificacion: lista.numIdentificacion
      },
    });
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
            this.FB.deleteCiudad(lista.id);
          },
        },
      ],
    });

    await alert.present();
  }

  async cerrar(){
    this.modalController.dismiss();
  }
  

}
