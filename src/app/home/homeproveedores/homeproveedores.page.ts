import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  NavController,

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
  listanomproveedores: any []=[];
  objproveedor:any;
  constructor(
    private navCtrl: NavController,
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
    this.listarnombresproveedores()
  }

  async editarModal(lista) {
    const modal = await this.modalController.create({
      component: CrearproveedorPage,
      cssClass: "my-custom-class",
      componentProps: {
        idTipoIdentificacionEdit: lista.idTipoIdentificacion,
        numIndetificacionEdit: lista.numIndetificacion,
        nombreEdit: lista.nombre,
        apellidoEdit: lista.apellido,
        telefonoEdit: lista.telefono,
        direccionEdit: lista.direccion,
        correoEdit: lista.correo,
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
      keyboardClose: false,
      backdropDismiss: false,
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
            this.FB.deleteProveedor(lista.id);
          },
        },
      ],
    });

    await alert.present();
  }

  async cerrar() {
    this.navCtrl.navigateForward('main-menu');
  }
  listarnombresproveedores(){
    this.listanomproveedores = [];
    this.objproveedor=null;
    this.FB.proveedoresLista.forEach(element=>{
      this.objproveedor= ({
        nombre: element.nombre, 
        apellido: element.apellido,
        numIndetificacion:element.numIndetificacion,
        telefono: element.telefono,
        direccion: element.direccion,
        correo: element.correo
        
      })
      this.listanomproveedores.push(this.objproveedor);
      
    })
    return this.listanomproveedores;
  }
  getItems(ev:any){
    this.listanomproveedores;
    let val = ev.target.value;
    if (val && val.trim() != '')
    {
      
      this.listanomproveedores = this.listanomproveedores.filter((item)=>{
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase())> -1)
        
      })
  
    }
    
      else if(val== '' || val == undefined)
      {   
          this.listanomproveedores= this.FB.proveedoresLista;
          return this.listanomproveedores;
      }
        
  
      
     
    }



}
