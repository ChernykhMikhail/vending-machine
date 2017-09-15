import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VendingMachineComponent } from './components/vending-machine/vending-machine.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserWalletComponent } from './components/user-wallet/user-wallet.component';
import { CoinAcceptorComponent } from './components/coin-acceptor/coin-acceptor.component';
import { ProductComponent } from './components/product/product.component';

import { UserCoinService } from './service/UserCoinService';
import { ProductService } from './service/ProductService';
import { VendingMachineService } from './service/VendingMachineService';
import { CoinComponent } from './components/coin/coin.component';

@NgModule({
  declarations: [
    AppComponent,
    VendingMachineComponent,
    ProductListComponent,
    UserWalletComponent,
    CoinAcceptorComponent,
    ProductComponent,
    CoinComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ UserCoinService, ProductService, VendingMachineService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
