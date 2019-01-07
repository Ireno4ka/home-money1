import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bill } from '../models/bill.model';
import { BaseApi } from 'src/app/shared/core/base-api';


@Injectable()

export class BillService extends BaseApi {

    constructor(public http: HttpClient) {
        super(http);
    }

    /* getBill(): Observable<Bill> {
        return this.http.get<Bill>('http://localhost:3000/bill');
    } */

    getBill(): Observable<Bill> {
        return this.get('bill');
    }

    getCurrency(/* base: string = 'RUB' */): Observable<any> {
        return this.http.get('http://data.fixer.io/api/latest?access_key=75596681a3ba377ce2d5af3a505c1da8&symbols=USD,RUB');
    }
}

