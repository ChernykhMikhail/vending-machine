import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CoinInfo } from '../../model/CoinInfo';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnInit {

  @Input() coinInfo: CoinInfo;
  @Output() selectEvent: EventEmitter<CoinInfo> = new EventEmitter<CoinInfo>();

  constructor() { }

  ngOnInit() {
  }

  onSelect(): void {
    this.selectEvent.emit(this.coinInfo);
  }
}
