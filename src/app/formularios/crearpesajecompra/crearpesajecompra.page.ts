import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FBservicesService } from '../../fbservices.service';
@Component({
  selector: 'app-crearpesajecompra',
  templateUrl: './crearpesajecompra.page.html',
  styleUrls: ['./crearpesajecompra.page.scss'],
})

export class CrearpesajecompraPage implements OnInit {
  proveedor = "fernanda";
  fechcompra = "03/10/2020";
  costopesaje = "$350.000";
  numbulto = 1;
  listaBultos: Array<any> = [];
  nuevoRegistro: any[] = [];

  incrementable: any[];
  id;
  constructor(
    private route: ActivatedRoute,
    private FB: FBservicesService
  ) {


  }


  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    this.incrementable = this.FB.numBultos;
  }
  addRegister() {

    console.log("INDEX: ", this.listaBultos);
    this.listaBultos.push(this.nuevoRegistro);
    this.nuevoRegistro = [];
  }

  removeRegister(index) {
    this.listaBultos.splice(index, 1);
  }


}
