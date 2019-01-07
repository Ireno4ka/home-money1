import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wfm-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent {

@Input() currency: any;

currencies: string[] = ['USD', 'EUR'];

getValue(c: string) {
  const { rates } = this.currency;
  /* console.log(rates); */
  if (c == 'USD') {
    return rates.RUB - ((rates.USD - 1) * rates.RUB);
  } else {
    return rates.RUB;
  }
}

/*curr = ['USD', 'EUR'];

constructor() {
  this.curr['USD'] = this.currency.rates.RUB - ((this.currency.rates.USD - 1) * this.currency.rates.RUB);
  this.curr['EUR'] = this.currency.rates.RUB;
  }
 */
}
