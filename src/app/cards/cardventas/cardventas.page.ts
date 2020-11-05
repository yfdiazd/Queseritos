import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardventas',
  templateUrl: './cardventas.page.html',
  styleUrls: ['./cardventas.page.scss'],
})
export class CardventasPage implements OnInit {
  nombrecliente: "Fernanda";
  nompreProducto: "Queso costeño";
  fechaCompra: "04-11-2020";
  pesoPesadas: "1000";

  constructor() { }

  ngOnInit() {
  }

}
