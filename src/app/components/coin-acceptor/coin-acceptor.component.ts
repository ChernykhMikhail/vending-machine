import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Coin } from '../../model/Coin';

@Component({
  selector: 'app-coin-acceptor',
  templateUrl: './coin-acceptor.component.html',
  styleUrls: ['./coin-acceptor.component.css']
})
export class CoinAcceptorComponent implements OnInit {

  @Input() receivedCash: number = 0;
  @Output() cashbackEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onCashback(): void {
    this.cashbackEvent.emit();
  }
}
