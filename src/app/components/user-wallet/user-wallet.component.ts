import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Coin } from '../../model/Coin';
import { CoinInfo } from '../../model/CoinInfo';
import { UserCoinService } from '../../service/UserCoinService';

@Component({
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.css']
})
export class UserWalletComponent implements OnInit {

  coinInfo: CoinInfo[];
  @Output() selectedCoin: EventEmitter<Coin> = new EventEmitter<Coin>();

  constructor(private userCoinService: UserCoinService){
  }

  ngOnInit() {
    this.coinInfo = this.userCoinService.getCoinInfo();
  }

  onSelectCoin(selectedCoin: CoinInfo): void{
    this.userCoinService.reduceCoin(selectedCoin)
          .then( (coin) => this.selectedCoin.emit(coin) )
          .catch( (reason) => console.error(reason) );
  }
}
