import { Component, Input, NgModule, OnInit } from "@angular/core";
import { ModalController, ToastController } from '@ionic/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FBservicesService } from "../../fbservices.service";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-creartrueque',
  templateUrl: './creartrueque.page.html',
  styleUrls: ['./creartrueque.page.scss'],
})
export class CreartruequePage implements OnInit {
  proveedor = "fernanda";
  selectedFile = null;

  @Input()tipoAnticipoEdit;
  @Input()valorEdit;
  constructor(
    private FB: FBservicesService,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  archSelecion(event){
    this.selectedFile = event.target.files[0];
  }

  upload(){
    
  }

}
