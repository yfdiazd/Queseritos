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
  cont:number =0;
  constructor(
    private modalCtrl: ModalController,
    private menu: MenuController,
    private FB: FBservicesService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private route : ActivatedRoute
  ) { 
    this.FB.clientesLista;
    console.log("nombres de clientes", this.FB.clientesLista)
  }

  ngOnInit() {
    
  }

  listarnombresclientes(){
    this.listanombres = [];
    this.FB.clientesLista.forEach(element=>{
      this.listanombres.push({nombres:element.nombres})
    })
  }
  

  irCardListaClientes(input){

    this.navCtrl.navigateForward('crearenviocliente/', input.id);
    console.log("imprimiendo input.id", input.id)
  }

  reorder(event) {
    console.log(event);
    const itemMover = this.FB.clientesLista.splice(event.detail.from, 1)[0];
    this.FB.clientesLista.splice(event.detail.to, 0, itemMover);
    event.detail.complete();
  }

  buscar(ev:any){
  this.FB.clientesLista;
  const val = ev.target.value;
  if (val && val.trim !== ''){
    this.FB.clientesLista=this.FB.clientesLista.filter((item)=>{
      return (item.toLowerCase().indexOf(val.toLowerCase())> -1);
    });
  }

  }
}
