import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  AlertController,
  ModalController,

} from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';
import { CrearproveedorPage } from 'src/app/formularios/crearproveedor/crearproveedor.page';
import { __values } from "tslib";
@Component({
  selector: 'app-homeproveedores',
  templateUrl: './homeproveedores.page.html',
  styleUrls: ['./homeproveedores.page.scss'],
})
export class HomeproveedoresPage implements OnInit {

  constructor(
    private FB: FBservicesService,
    public alertController: AlertController,
    private router: Router,
    public modalController: ModalController) { }

    nombre: string;
    apellido: string;
    numIndetificacion: number;
    telefono: number;
    direccion: string;


  ngOnInit() {
  }
  
  async editarModal(lista) {
    const modal = await this.modalController.create({
      component: CrearproveedorPage,
      cssClass: "my-custom-class",
      componentProps: {
        idTipoIdentificacionEdit: lista.idTipoIdentificacion,
        numIndetificacionEdit:lista.numIndetificacion,
        nombreEdit:lista.nombre,
        apellidoEdit:lista.apellido,
        telefonoEdit:lista.telefono,
        direccionEdit:lista.direccion,
        correoEdit:lista.correo,
        id: lista.id

      },
    });
    return await modal.present();
  }
  
  async crearModal() {
    const modal = await this.modalController.create({
      component: CrearproveedorPage,
      cssClass: "my-custom-class"      
    });
    return await modal.present();
  }

  async eliminar(lista) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Espera",
      message: "¿Esta seguro de eliminar " + lista.descripcion + "?",
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
