import { Injectable } from '@angular/core';

import { Coin } from '../model/Coin';
import { CoinInfo } from '../model/CoinInfo';
import { Product } from '../model/Product';
import { DignityOfCoin } from '../service/DignityOfCoin';

@Injectable()
export class VendingMachineService {
    machineCoins: CoinInfo[] = [
        { coin: { value: DignityOfCoin.ONE }, balance: 100 },
        { coin: { value: DignityOfCoin.TWO }, balance: 100 },
        { coin: { value: DignityOfCoin.FIVE }, balance: 100 },
        { coin: { value: DignityOfCoin.TEN }, balance: 100 }
    ];

    sizeOfPayment = 0;

    constructor() {}

    tryPurchase(product: Product): boolean {
        if (this.sizeOfPayment < product.price) {
            return false;
        }
        this.sizeOfPayment -= product.price;
        return true;
    }

    increaseCoins(coin: Coin): void {
        this.machineCoins.find( (el) => el.coin.value === coin.value ).balance++;
        this.sizeOfPayment += coin.value;
    }

    reduceCoins(): Coin[] {
        let tempCoins: Coin[] = [];
        let sum = this.sizeOfPayment;
        let coinBalance = this.machineCoins.map(el => el.balance);

        const coinDignity = [1, 2, 5, 10];
        for (let j = coinDignity.length - 1; j >= 0; j--) {
            let i = j;
            while (sum > 0 && i >= 0) {
                if (sum - coinDignity[i] >= 0 && coinBalance[i] > 0) {
                    sum -= coinDignity[i];
                    coinBalance[i]--;
                    tempCoins.push(this.machineCoins[i].coin);
                } else i--;
            }
            if (sum != 0 && j != 0) {
                sum = this.sizeOfPayment;
                coinBalance = this.machineCoins.map(el => el.balance);
                tempCoins = [];
            } /*else break;*/
        }

        if (sum != 0) {
            tempCoins = [];
        } else {
            coinBalance.forEach( (el, index) => this.machineCoins[index].balance = el );
        }
        this.sizeOfPayment = sum;
        return tempCoins;
    }

    getCoinInfo(): CoinInfo[] {
        return this.machineCoins;
    }

    getSumPayment(): number {
        return this.sizeOfPayment;
    }
}
