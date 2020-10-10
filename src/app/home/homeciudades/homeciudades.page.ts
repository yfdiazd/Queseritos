import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';
import { __values } from 'tslib';
@Component({
  selector: 'app-homeciudades',
  templateUrl: './homeciudades.page.html',
  styleUrls: ['./homeciudades.page.scss'],
})
export class HomeciudadesPage implements OnInit {

  constructor(private FB: FBservicesService,
    private actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private router: Router) { }

  codigoCiudad: string;
  descripcionCiudad: string;

  ngOnInit() {
  }

  crear() {
    this.router.navigate(["crearciudad"])
  }

  confirarEdición(cod,des){
    this.FB.updateCiudad(cod,des);
  }

  editar(cod: string, des: string) {
    this.presentAlertConfirm(cod, des);
  }

  val1;
  val2;
  async presentAlertConfirm(cod, des) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modificar registro',
      inputs: [
        {
          name: 'Codigo',
          type: 'text',
          value: cod,
          placeholder: ' Codigo'
        },
        {
          name: 'Codigo',
          type: 'text',
          value: des,
          placeholder: ' Descripción',
          handler: () =>{
          
          }
        }
      ],

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Modificar',
          handler: () => {
            
            console.log("Se modifico correctamente");
          }
        }
      ]
    });

    await alert.present();
  }
  // editarCiudad() {
  //   this.router.navigate(["crearciudad"]);
  //   // this.FB.updateCiudad(this.codigoCiudad, this.descripcionCiudad);
  //   //this.FB.deleteCiudad("1602202142339");

  // }

}
