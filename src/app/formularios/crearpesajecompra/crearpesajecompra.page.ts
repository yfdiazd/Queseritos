import { Component, OnInit } from '@angular/core';
import { FBservicesService } from '../../fbservices.service'
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
  numbulto= 1;
  private fieldArray: Array<any> = []; 
  private newAttribute: any = {}; 

  addFieldValue() { 
   this.fieldArray.push(this.newAttribute) 
   this.newAttribute = {}; 
  } 

  deleteFieldValue(index) { 
   this.fieldArray.splice(index, 1); 
  } 
  
  constructor() { }

  ngOnInit() {
  }



}
