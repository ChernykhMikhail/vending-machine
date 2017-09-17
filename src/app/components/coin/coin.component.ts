import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CoinInfo } from '../../model/CoinInfo';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnInit {

  @Input() coinInfo: CoinInfo;
  @Input() debug: boolean;
  @Output() selectEvent: EventEmitter<CoinInfo> = new EventEmitter<CoinInfo>();

  constructor() { }

  ngOnInit() {
  }

  onKeydown(event): boolean {
  if (!(event.keyCode >= 48 && event.keyCode <= 57 
        || event.keyCode === 8 
        || event.keyCode === 37 
        || event.keyCode === 39
        || event.keyCode >= 94 && event.keyCode <= 105)) {
      return false;
    }
  }

  onBlur(event): void {
    if (event.target.value === '') {
      this.coinInfo.balance = 0;
    } else if (event.target.value.indexOf('0') === 0) {
      let value = event.target.value;
      while (value.indexOf('0') === 0 && value.length > 1) {
        value = value.substring(1);
      }
      event.target.value = value;
    }
  }

  onSelect(): void {
    this.selectEvent.emit(this.coinInfo);
  }
}
