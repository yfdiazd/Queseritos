import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import {formatCurrency, getCurrencySymbol} from '@angular/common';
import { FBservicesService } from '../../fbservices.service';




@Component({
  selector: 'app-creartrueque',
  templateUrl: './creartrueque.page.html',
  styleUrls: ['./creartrueque.page.scss'],
})
export class CreartruequePage implements OnInit {
cantidad:string;

  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  // ----------------VARIABLES-------------
  tipoAnticipoEdit: any;
  valor: any;
  selectedFile: File;
  public idCompraRecibida: any;
  public nombreProv: any;
//   @Pipe({
//     name: 'thousandsPipe'
// })

  //--------------------------------------
  @Input() datos;

  ngOnInit() {    
    console.log("ME enviarón este compra", this.datos.id)
    console.log("ME enviarón este proveedor", this.datos.idProveedor)
    this.traerNombre();

     
  }
  
    //  transform(value: any) {
    //   return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
    //  }

  


// separador(value: string){
//      console.log("entro a funcion separador", value)
//      let val = parseInt(value, 10);
//      if (Number.isNaN(val)) {
//       val = 0;
//     }
//     this.cantidad = formatCurrency(val, 'en-US', getCurrencySymbol('USD', 'wide'));
//     }
  // var separador = event;
  // console.log("imprime separador", separador)
  // separador.addEventListener('keyup', (e) =>{
  //     console.log("muestro la entrada del campo valor ", entrada); 
  //     var entrada= e.target.value.split('.').join('');
  //     entrada = entrada.split('').reverse();
  //     var salida = [];
  //     var aux = '';
  //     console.log("muestro la entrada del campo valor ", entrada); 
  //     var paginador = Math.ceil(entrada.lenght / 3 );
  //     console.log("muestro la paginación ", paginador); 
  //     for(let i= 0; i<paginador; i++)
  //     {
  //         for(let j=0; j<3; j++){
  //             if(entrada[j+(i*3)]!=undefined){
  //                 aux+=entrada[j+(i*3)];
  
  //             }
  //         }
  //         salida.push(aux);
  //         console.log("muestro la paginación ", aux); 
  //         aux='';
  //         e.target.value=salida.join('.').split("").reverse().join('')
  //     }
     
  // }, false);



  traerNombre() {
    this.nombreProv = [];
    console.log("Nombre prov", this.datos.idProveedor);

    this.FB.proveedoresLista.forEach(element => {
      if (element.id == this.datos.idProveedor) {
        this.nombreProv = element.nombre;
      }
    })
  }

  imagen: any;
  nombreArchLoaded: string = "Subir Archivo";
  subirImg(event) {
    this.imagen = event;    
    this.nombreArchLoaded = (this.imagen.target.files[0].name +" fue cargado 100%");
    
    
    return this.imagen, this.nombreArchLoaded;

  }
  guardar() {

    console.log("loteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee ", this.datos.lote);
    this.FB.crearBalanceLote(this.datos.idProveedor, this.datos.lote);
    this.FB.registrarAnticiposApesajeCompra(this.datos.idProveedor, this.datos.id, this.datos.lote, this.tipoAnticipoEdit, this.valor, this.imagen);


    // if (this.id1 == undefined) {
    //   console.log("Entro a crear anticipo")
    //   if (this.tipoAnticipoEdit == undefined || this.valorEdit == undefined) {
    //     this.toastCamposRequeridos();
    //   } else {
    //     this.FB.registrarAnticiposApesajeCompra("1603763143063", "12345", this.tipoAnticipoEdit, this.valorEdit, "image");
    //     this.modalCtrl.dismiss();

    //   }

    // } else {
    //   console.log("Entro a MODIFICAR---")
    //   if (this.tipoAnticipoEdit == "" || this.valorEdit == "") {
    //     this.toastCamposRequeridos();
    //     console.log("No modificaste nada")
    //   } else {
    //     this.FB.registrarAnticiposApesajeCompra("1603763143063", "12345", this.tipoAnticipoEdit, this.valorEdit, "image");
    //     this.modalCtrl.dismiss();
    //   }
    // }
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
}



