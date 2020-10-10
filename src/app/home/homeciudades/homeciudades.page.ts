import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { FBservicesService } from 'src/app/fbservices.service';
@Component({
  selector: 'app-homeciudades',
  templateUrl: './homeciudades.page.html',
  styleUrls: ['./homeciudades.page.scss'],
})
export class HomeciudadesPage implements OnInit {

  constructor(private FB: FBservicesService,
    private actionSheetController: ActionSheetController,
    private router: Router) { }

  ngOnInit() {
  }

  crear(){
    this.router.navigate(["crearciudad"])
  }

  

}
