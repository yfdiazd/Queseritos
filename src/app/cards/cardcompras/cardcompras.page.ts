import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardcompras',
  templateUrl: './cardcompras.page.html',
  styleUrls: ['./cardcompras.page.scss'],
})
export class CardcomprasPage implements OnInit {
  pesolimite="500";
  pesoacumulado="$0";
  saldodebitototal="$0";
  saldocreditotal="$0";
  constructor() { }

  ngOnInit() {
  }

}
