import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest, Subscription } from 'rxjs';

import { Bill } from '../shared/models/bill.model';
import { BillService } from '../shared/services/bill.service';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})

export class BillPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;

  currency: any;
  bill: Bill;

  isLoaded = false;


  constructor(private billservice: BillService) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billservice.getBill(),
      this.billservice.getCurrency(),
    ).subscribe((date: [Bill, any]) => {
      this.bill = date[0];
      this.currency = date[1];
      this.isLoaded = true;
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billservice.getCurrency()
      .pipe(delay(2000))
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    if (this.sub2) {
        this.sub2.unsubscribe();
      }
  }
}
