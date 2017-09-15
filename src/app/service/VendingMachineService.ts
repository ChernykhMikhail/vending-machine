import { Injectable } from '@angular/core';

import { Coin } from '../model/Coin';
import { CoinInfo } from '../model/CoinInfo';
import { Product } from '../model/Product';
import { DignityOfCoin } from '../service/DignityOfCoin';

@Injectable()
export class VendingMachineService {
    machineCoins: CoinInfo[] = [
        { coin: { value: DignityOfCoin.ONE }, balance: 0 },
        { coin: { value: DignityOfCoin.TWO }, balance: 100 },
        { coin: { value: DignityOfCoin.FIVE }, balance: 0 },
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
        while (sum > 0) {
            if (sum - DignityOfCoin.TEN >= 0 && this.machineCoins[3].balance > 0) {

                this.machineCoins[3].balance--;
                sum -= DignityOfCoin.TEN;
                this.sizeOfPayment -= DignityOfCoin.TEN;
                tempCoins.push(this.machineCoins[3].coin);

            } else if (sum - DignityOfCoin.FIVE >= 0 && this.machineCoins[2].balance > 0) {

                this.machineCoins[2].balance--;
                sum -= DignityOfCoin.FIVE;
                this.sizeOfPayment -= DignityOfCoin.FIVE;
                tempCoins.push(this.machineCoins[2].coin);

            } else if (sum - DignityOfCoin.TWO >= 0 && this.machineCoins[1].balance > 0) {

                this.machineCoins[1].balance--;
                sum -= DignityOfCoin.TWO;
                this.sizeOfPayment -= DignityOfCoin.TWO;
                tempCoins.push(this.machineCoins[1].coin);

            } else if (sum - DignityOfCoin.ONE >= 0 && this.machineCoins[0].balance > 0) {

                this.machineCoins[0].balance--;
                sum -= DignityOfCoin.ONE;
                this.sizeOfPayment -= DignityOfCoin.ONE;
                tempCoins.push(this.machineCoins[0].coin);

            } else {
                console.log(`Извините, в кассе недостаточно монет для выдачи суммы: ${ tempSum } в полном объёме`);
                this.sizeOfPayment = tempSum;
                while (tempCoins.length > 0) {
                    const coin = tempCoins.shift();
                    if (coin.value === DignityOfCoin.ONE) {
                        this.machineCoins[0].balance++;
                    } else if (coin.value === DignityOfCoin.TWO) {
                        this.machineCoins[1].balance++;
                    } else if (coin.value === DignityOfCoin.FIVE) {
                        this.machineCoins[2].balance++;
                    } else {
                        this.machineCoins[3].balance++;
                    }
                }
                break;
            }
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
