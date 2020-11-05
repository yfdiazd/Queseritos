import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { storage } from 'firebase';
import { FBservicesService } from 'src/app/fbservices.service';
@Component({
  selector: 'app-homeventas',
  templateUrl: './homeventas.page.html',
  styleUrls: ['./homeventas.page.scss'],
})
export class HomeventasPage implements OnInit {

  constructor(
    private FB: FBservicesService,
    public PopoverController: PopoverController,
    public modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

}
