import { Component, OnInit } from '@angular/core';
import { FBservicesService } from 'src/app/fbservices.service';
import { MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { identifierModuleUrl } from '@angular/compiler';
import { element } from 'protractor';
@Component({
  selector: 'app-cardlistaproveedores',
  templateUrl: './cardlistaproveedores.page.html',
  styleUrls: ['./cardlistaproveedores.page.scss'],
})
export class CardlistaproveedoresPage implements OnInit {
  listaprovlote: any[] = [];
  listanombres: any[] = [];
  cont:number =0;
  constructor(
    private modalCtrl: ModalController,
    private menu: MenuController,
    private FB: FBservicesService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.listarproveedores();
  }


  ngOnInit() {
  }

listarproveedores()
{


  // this.listaprovlote = [];
  // this.listanombres = [];
  // this.FB.proveedoresCompraLista.forEach(element => {
  //   this.listaprovlote.push({ id: element})

  // });
  //   this.FB.proveedoresLista.forEach(element => {
  //   this.listaprovlote.forEach(element2 => {
  //     console.log("imprime element2", element2)
  //     if (element.id == element2.id)
  //       this.listanombres.push(element.nombre)

  //   })
  // })
  
  
}


  validarlote:any [];
  irCardLote(input){
    if(this.validarlote==undefined || this.validarlote == null)
    {
    
      this.presentAlertConfirm(input);
      console.log("va a mostrar el pop up", input);
    }
    else 
    {
      
      this.navCtrl.navigateForward('cardlotes')
      console.log("va ir a cardlote",  input);
    }
  }

  async presentAlertConfirm(input) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'El proveedor no tiene asociado lote de compra, ¿Desea crearle un anticipo?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('canceló no hace nada');
          }
        }, {
          text: 'Okay',
          handler: (input) => {
            this.navCtrl.navigateForward('creartrueque/', input.id);
            console.log("imprimiendo input.id", input.id)

            console.log('Confirmó entonces se va a creartrueque');
          }
        }
      ]
    });

    await alert.present();
  }

 

  reorder(event) {
    console.log(event);
    const itemMover = this.listanombres.splice(event.detail.from, 1)[0];
    this.listanombres.splice(event.detail.to, 0, itemMover);
    event.detail.complete();
  }

  buscar(ev:any){
  this.listanombres;
  const val = ev.target.value;
  if (val && val.trim !== ''){
    this.listanombres=this.listanombres.filter((item)=>{
      return (item.toLowerCase().indexOf(val.toLowerCase())> -1);
    });
  }

  }

}
