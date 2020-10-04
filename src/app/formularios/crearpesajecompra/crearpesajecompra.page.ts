import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crearpesajecompra',
  templateUrl: './crearpesajecompra.page.html',
  styleUrls: ['./crearpesajecompra.page.scss'],
})
export class CrearpesajecompraPage implements OnInit {
  proveedor = "fernanda";
  idproveedor = "1053790255";
  fechcompra = "03/10/2020";
  costopesaje= "$350.000";
  constructor() { }

  ngOnInit() {
  }

}
