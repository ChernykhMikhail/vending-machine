import { Injectable, OnInit } from '@angular/core';

import { Coin } from '../model/Coin';
import { CoinInfo } from '../model/CoinInfo';
import { DignityOfCoin } from '../service/DignityOfCoin';

@Injectable()
export class UserCoinService implements OnInit {
    coinInfo: CoinInfo[] = [
        { coin: { value: DignityOfCoin.ONE }, balance: 10 },
        { coin: { value: DignityOfCoin.TWO }, balance: 30 },
        { coin: { value: DignityOfCoin.FIVE }, balance: 20 },
        { coin: { value: DignityOfCoin.TEN }, balance: 15 },
    ];

    constructor() {}

    ngOnInit() {
    }

    getCoinInfo(): CoinInfo[] {
        return this.coinInfo;
    }

    reduceCoin(arg: CoinInfo): Promise<Coin> {
        const index = this.coinInfo.indexOf(arg);
        if (this.coinInfo[index].balance === 0) {
            return Promise.reject(`No such coin: Dignity of ${ arg.coin.value }`);
        } else {
            this.coinInfo[index].balance--;
            return Promise.resolve<Coin>(this.coinInfo[index].coin);
        }
    }

    increaseCoin(coins: Coin[]): void {
        for (const coin of coins) {
            this.coinInfo.find( (el) => el.coin.value === coin.value ).balance++;
        }
    }
}
