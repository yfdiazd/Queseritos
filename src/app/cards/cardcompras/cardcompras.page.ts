import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cardcompras',
  templateUrl: './cardcompras.page.html',
  styleUrls: ['./cardcompras.page.scss'],
})
export class CardcomprasPage implements OnInit {
@Input() items: any[] = [];
  constructor() { }

  ngOnInit() {
  }

}
