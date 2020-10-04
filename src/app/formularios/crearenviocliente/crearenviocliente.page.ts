import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crearenviocliente',
  templateUrl: './crearenviocliente.page.html',
  styleUrls: ['./crearenviocliente.page.scss'],
})
export class CrearenvioclientePage implements OnInit {

  constructor() { }
  cliente = "fernanda";
  idcliente = "1053790255";
  codigociudad = "Bogotá"
  costopesada = "$2.000.000"
  conductor = "Tobias"
  ngOnInit() {
  }

}
