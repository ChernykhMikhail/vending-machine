import { Component, OnInit } from '@angular/core';

import { Coin } from '../../model/Coin';
import { CoinInfo } from '../../model/CoinInfo';
import { Product } from '../../model/Product';
import { ProductService } from '../../service/ProductService';
import { UserCoinService } from '../../service/UserCoinService';
import { VendingMachineService } from '../../service/VendingMachineService';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.css']
})
export class VendingMachineComponent implements OnInit {

  machineCoins: CoinInfo[];
  sumOfCash: number = 0;
  showSuccessMessage: boolean = false;
  showFailMessage: boolean = false;
  successMessage: string = 'Спасибо!';
  failMessage: string = 'Недостаточно средств';

  constructor( private productService: ProductService,
               private vmService: VendingMachineService,
               private userCoinService: UserCoinService ) { }

  ngOnInit() {
    this.machineCoins = this.vmService.getCoinInfo();
    this.sumOfCash = this.vmService.getSumPayment();
  }

  onCashback(): void{
    this.userCoinService.increaseCoin(this.sumOfCash);
    this.sumOfCash = this.vmService.reduceCoins(this.sumOfCash);
  }

  onGetCoins(coin: Coin): void {
    this.vmService.increaseCoins(coin);
    this.sumOfCash = this.vmService.getSumPayment();
  }

  onBuyProduct(product: Product): void {
    let success = this.vmService.tryPurchase(product);
    if (success) {
      this.productService.removeProduct(product);
      this.sumOfCash = this.vmService.getSumPayment();
      this.showSuccessMessage = true;
      setTimeout( () => this.showSuccessMessage = false, 2000);
    } else {
      this.showFailMessage = true;
      setTimeout( () => this.showFailMessage = false, 2000);
    }
  }
}
