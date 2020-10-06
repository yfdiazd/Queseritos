import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmarpesaje',
  templateUrl: './confirmarpesaje.page.html',
  styleUrls: ['./confirmarpesaje.page.scss'],
})
export class ConfirmarpesajePage implements OnInit {
  proveedor="fernanda";
  idproveedor="1053790255";
  fechcompra="05-10-2020";
  estadoqueso="Borona";
  estadoqueso1="Normal";
  tipqueso="Costeño";
  totalbultos=30;
  pesototal=1000;
  constructor() { }

  ngOnInit() {
  }

}
