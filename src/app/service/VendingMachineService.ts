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
        if (coin.value === DignityOfCoin.ONE) {
            this.machineCoins[0].balance++;
        } else if (coin.value === DignityOfCoin.TWO) {
            this.machineCoins[1].balance++;
        } else if (coin.value === DignityOfCoin.FIVE) {
            this.machineCoins[2].balance++;
        } else {
            this.machineCoins[3].balance++;
        }
        this.sizeOfPayment += coin.value;
    }

    reduceCoins(sum: number): number {
        while (sum > 0) {
            if (sum - DignityOfCoin.TEN >= 0) {

                this.machineCoins[3].balance--;
                sum -= DignityOfCoin.TEN;
                this.sizeOfPayment -= DignityOfCoin.TEN;

            } else if (sum - DignityOfCoin.FIVE >= 0) {

                this.machineCoins[2].balance--;
                sum -= DignityOfCoin.FIVE;
                this.sizeOfPayment -= DignityOfCoin.FIVE;

            } else if (sum - DignityOfCoin.TWO >= 0) {

                this.machineCoins[1].balance--;
                sum -= DignityOfCoin.TWO;
                this.sizeOfPayment -= DignityOfCoin.TWO;

            } else {

                this.machineCoins[0].balance--;
                sum -= DignityOfCoin.ONE;
                this.sizeOfPayment -= DignityOfCoin.ONE;

            }
        }
        return this.sizeOfPayment;
    }

    getCoinInfo(): CoinInfo[] {
        return this.machineCoins;
    }

    getSumPayment(): number {
        return this.sizeOfPayment;
    }
}
