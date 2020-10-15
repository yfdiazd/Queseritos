import { Component, NgModule, OnInit } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, FormArray} from '@angular/forms';
import { FBservicesService } from '../../fbservices.service';
@Component({
  selector: 'app-crearpesajecompra',
  templateUrl: './crearpesajecompra.page.html',
  styleUrls: ['./crearpesajecompra.page.scss'],
})
@NgModule({
    imports: [
    // other imports ...
    ReactiveFormsModule,
    FormsModule,
    FormBuilder,
    FormArray
  ],
})
export class CrearpesajecompraPage implements OnInit {
  proveedor = "fernanda";
  fechcompra = "03/10/2020";
  costopesaje= "$350.000";
  numbulto= 1;

  CrearpesajecompraForm = this.formBuilder.group
  ({
    pesajes: this.formBuilder.array([])
  });
 
  constructor(
    private formBuilder:FormBuilder) {

   }

  get pesajes(){
    return this.CrearpesajecompraForm.get('pesajes') as FormArray;
  }

   ngOnInit() {
     }

  agregarPesaje(){
    const pesajeFormGroup  = this.formBuilder.group({
      Bulto: '',
      Peso: ''
    });
    this.pesajes.push(pesajeFormGroup);
  }

  removerPesaje(indice: number) {
    this.pesajes.removeAt(indice);
  }

  refrescar() {
     
    this.pesajes.controls.splice(0, this.pesajes.length);
  }



}
