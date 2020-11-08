import { Component, Input, NgModule, OnInit } from "@angular/core";
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { FBservicesService } from "../../fbservices.service";
import { HomeventasPage } from 'src/app/home/homeventas/homeventas.page';

@Component({
  selector: 'app-cardventas',
  templateUrl: './cardventas.page.html',
  styleUrls: ['./cardventas.page.scss'],
})
export class CardventasPage implements OnInit {
  // listas
  public tipoQueso: any;
  public nombreCliente: any;
  public listaPesadas: any;
  public listaPesadasVenta: any;
  anofecha: Date =new Date();
  customPickerOptions;
  fechafiltro;
  show:boolean =true;
  hiden:boolean =false;
  //Datos consolidados para la visualización
  listaCard: any[] = [];
  //lista de la venta que se recorre en el HTML
  public listaVentas: any[] = [];
 

  constructor(
    private FB: FBservicesService,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  public idcliente:any;
  ngOnInit() {

    this.customPickerOptions = {
      buttons: [{
        text: 'Aceptar',
        handler: (evento) => {
          this.show=false;
          this.hiden=true;
          console.log("imprime event", evento)

        }
        

               
      }, {
        text: 'Cancelar',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return true;
        }
      }]
    }
    
    let id = this.route.snapshot.paramMap.get("id");
    console.log("se recibe id solito", id );
    this.idcliente=id;
    console.log("se recibe id listacliente", this.idcliente);
    this.traerNombre();
    console.log("imprime lista de ventas de FB", this.FB.ventasclienteLista);
   
    
    
    
   
  }
  irVender(input){
    console.log("Se envia este id cliente", this.idcliente);
    this.navCtrl.navigateBack(["crearenviocliente/", this.idcliente]);
  }

  // async modalConfirmarPesada(card) {
  //   this.FB.getInfoCompra(this.idcliente, card.id)
  //   this.FB.getPesajeConfirmado(this.idcliente, card.id);
  //   const modal = await this.modalController.create({
  //     component: HomeventasPage,
  //     cssClass: 'my-custom-class',
  //     keyboardClose: false,
  //     backdropDismiss: false,
  //     componentProps: {
  //       idVenta: card.id,
  //       idClient: this.idcliente
  //     },
  //   });
  //   await modal.present();

  // }

  recorriendolista(){
    this.FB.ventasclienteListaMes.forEach(element=>{
      console.log("elementttttt", element)
    })
  }
  async traerNombre(){
    this.nombreCliente=[];
    //this.listaVentas = [];
    console.log("idcliente traer nombre:", this.idcliente);
    
    this.FB.clientesLista.forEach(element => {
         if (element.id == this.idcliente) {
          this.nombreCliente = element.nombres;
        }
      })
      console.log("imprime nombre del cliente", this.nombreCliente);
      return this.nombreCliente;
    // this.FB.ventasclienteLista.forEach(pesaje => {
    //   this.FB.productosLista.forEach(producto => {
    //     if (pesaje.idProducto == producto.id) {

    //       this.listaVentas.push({
    //         anticipos: pesaje.anticipos,
    //         bultoLista: pesaje.bultoLista,
    //         costoTotalCompra: pesaje.costoTotalCompra,
    //         fechaCompra: pesaje.fechaCompra,
    //         id: pesaje.id,
    //         idProducto: pesaje.idProducto,
    //         idProveedor: pesaje.idProveedor,
    //         lote: pesaje.lote,
    //         pesoBultos: pesaje.pesoBultos,
    //         totalBulto: pesaje.totalBulto,
    //         nompreProducto: producto.descripcion
    //       })
    //     }
    //   })
    // })

  }

  // cambioFecha(event){
  //   console.log("imprimo evento recibido en campo fecha", event);
  //   console.log('Date', new Date(event.detail.value));
    

  // }

}
