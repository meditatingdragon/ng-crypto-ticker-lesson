import { Component } from '@angular/core';
import { CryptoService } from './crypto.service';

import { CURRENCIES } from './utils/CURRENCIES';
import { CRYPTO } from './utils/CRYPTO';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  baseCurrencies = CURRENCIES.rows;
  targetCurrencies = CRYPTO.rows;
  title = 'Crypto Exchange Ticker';
  base;
  target;
  change;
  price;
  volume;
  info = {
    base: 'USD',
    target: 'BTC'
  };

  constructor(private exchangeService:CryptoService) {
    if (this.info.base && this.info.target) {
      this.exchangeService.getExchangeRates(this.info.base, this.info.target)
    .subscribe( (data) => {
      if (data) {
        this.base = data.base;
        this.target = data.target;
        this.change = data.change;
        this.price = data.price;
        this.volume = data.volume;
      }
    });
    }
  }

  updateTicker() {
    if (this.info.base && this.info.target) {
      this.exchangeService.getExchangeRates(this.info.base, this.info.target)
      .subscribe( (data) => {
        if (data) {
          this.base = data.base;
          this.target = data.target;
          this.change = data.change;
          this.price = data.price;
          this.volume = data.volume;
        }
      });
    }
  }

  onSubmit() {

  }
}
