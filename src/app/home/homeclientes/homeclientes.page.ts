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
  listanombrecliente: any[] = [];
  objclientes: any;
  constructor(
    private navCtrl: NavController,
    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {
    this.listarnombresclientes()
  }

  ngOnInit() {
    this.listarnombresclientes()
  }

  async editarModal(lista) {
    const modal = await this.modalCtrl.create({
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
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data == "true") {
      this.listarnombresclientes();
    }
  }

  async crearModal() {
    const modal = await this.modalCtrl.create({
      component: CrearclientesPage,
      cssClass: "my-custom-class"
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data == "true") {
      this.listarnombresclientes();
    }

  }

  async eliminar(lista) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      keyboardClose: false,
      backdropDismiss: false,
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
            this.listarnombresclientes();

          },
        },
      ],
    });

    await alert.present();
  }

  async cerrar() {
    this.navCtrl.navigateBack('main-menu');
  }

  listarnombresclientes() {
    this.listanombrecliente = [];
    this.objclientes = null;
    this.FB.clientesLista.forEach(element => {
      this.objclientes = ({
        apellidos: element.apellidos,
        celular: element.celular,
        correo: element.correo,
        direccion: element.direccion,
        empresa: element.empresa,
        id: element.id,
        idCiudad: element.idCiudad,
        idTipoIdentificacion: element.idTipoIdentificacion,
        nombres: element.nombres,
        numIndetificacion: element.numIndetificacion,
      })
      this.listanombrecliente.push(this.objclientes);

    })
    return this.listanombrecliente;
  }
  getItems(ev: any) {
    this.listanombrecliente;
    let val = ev.target.value;
    if (val && val.trim() != '') {

      this.listanombrecliente = this.listanombrecliente.filter((item) => {
        return (item.nombres.toLowerCase().indexOf(val.toLowerCase()) > -1)

      })

    }

    else if (val == '' || val == undefined) {
      this.listanombrecliente = this.FB.clientesLista;
      return this.listanombrecliente;
    }




  }


}
