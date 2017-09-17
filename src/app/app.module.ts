import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VendingMachineComponent } from './components/vending-machine/vending-machine.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserWalletComponent } from './components/user-wallet/user-wallet.component';
import { CoinAcceptorComponent } from './components/coin-acceptor/coin-acceptor.component';
import { ProductComponent } from './components/product/product.component';

import { UserCoinService } from './service/UserCoinService';
import { ProductService } from './service/ProductService';
import { MessageBoxService } from './service/message-box.service';
import { VendingMachineService } from './service/VendingMachineService';
import { CoinComponent } from './components/coin/coin.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { MessageBoxPositionDirective } from './directives/message-box-position.directive';

@NgModule({
  declarations: [
    AppComponent,
    VendingMachineComponent,
    ProductListComponent,
    UserWalletComponent,
    CoinAcceptorComponent,
    ProductComponent,
    CoinComponent,
    MessageBoxComponent,
    MessageBoxPositionDirective
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [ UserCoinService, ProductService, VendingMachineService, MessageBoxService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
