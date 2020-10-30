import { Component, Input, OnInit } from '@angular/core';
import { FBservicesService } from 'src/app/fbservices.service';
import { MenuController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { identifierModuleUrl } from '@angular/compiler';
import { element } from 'protractor';

@Component({
  selector: 'app-cardlistaclientes',
  templateUrl: './cardlistaclientes.page.html',
  styleUrls: ['./cardlistaclientes.page.scss'],
})
export class CardlistaclientesPage implements OnInit {
  listanombres: any[] = [];
  nombres:string;
  cont:number =0;
  items:any;
  constructor(
    private modalCtrl: ModalController,
    private menu: MenuController,
    private FB: FBservicesService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private route : ActivatedRoute,

  ) { 
    this.listarnombresclientes();
    this.initializeItems();
  }

  ngOnInit() {
    
  }
initializeItems(){
  this.items = this.listanombres;
  console.log("imprime el items", this.items)

}

getItems(ev:any){
  let val = ev.target.value;
  if (val && val.trim() != '')
  {
    console.log("imprime valor de val", val)
    this.items = this.items.filter((item)=>{
      console.log("imprime valor de item", item)
      return (item.toLowerCase().indexOf(val.toLowerCase())> -1)
      console.log("retorna item y val", item)
    })

  }
}

  listarnombresclientes(){
    this.listanombres = [];
    this.FB.clientesLista.forEach(element=>{
      this.listanombres.push(element.nombres)
      //console.log("imprimiendo nombres", element)
    })
  }
  

  irCardListaClientes(input){

    this.navCtrl.navigateForward(['crearenviocliente/', input.id]);
    console.log("se envia id cliente", input.id)
  }

  // reorder(event) {
  //   console.log(event);
  //   const itemMover = this.FB.clientesLista.splice(event.detail.from, 1)[0];
  //   this.FB.clientesLista.splice(event.detail.to, 0, itemMover);
  //   event.detail.complete();
  // }
 


}
