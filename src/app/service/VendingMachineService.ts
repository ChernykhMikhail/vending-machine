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

    reduceCoins(sum: number): Coin[] {
        const tempSum = sum;
        const tempCoins: Coin[] = [];
        const tempSizeOfPayment = this.sizeOfPayment;
        let coinBalance = this.machineCoins.map(el => el.balance);

        const coinDignity = [1, 2, 5, 10];
        for (let j = coinDignity.length; j >= 0; j--) {
            let i = j;
            while (sum > 0 && i >= 0) {
                if (sum - coinDignity[i] >= 0 && coinBalance[i] > 0) {
                    sum -= coinDignity[i];
                    coinBalance[i]--;
                    tempCoins.push(this.machineCoins[i].coin);
                    this.sizeOfPayment -= coinDignity[i];
                } else i--;
            }
            if (sum != 0 && j != 0) {
                sum = tempSum;
                coinBalance = this.machineCoins.map(el => el.balance);
                tempCoins.splice(0);
                this.sizeOfPayment = tempSizeOfPayment;
            }
        }

        if (sum != 0) {
            console.log(`Извините, в кассе недостаточно монет для выдачи суммы: ${ tempSum } в полном объёме`);
            tempCoins.forEach(
                (el) => {
                    if (el.value === DignityOfCoin.ONE) {
                        this.machineCoins[0].balance++;
                    } else if (el.value === DignityOfCoin.TWO) {
                        this.machineCoins[1].balance++;
                    } else if (el.value === DignityOfCoin.FIVE) {
                        this.machineCoins[2].balance++;
                    } else {
                        this.machineCoins[3].balance++;
                    }
                }
            );
            tempCoins.splice(0);
        } else {
            coinBalance.forEach( (el, index) => {
                this.machineCoins[index].balance = el;
            });
        }
        return tempCoins;
    }

    getCoinInfo(): CoinInfo[] {
        return this.machineCoins;
    }

    getSumPayment(): number {
        return this.sizeOfPayment;
    }
}
