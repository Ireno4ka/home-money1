import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../shared/models/category.model';
import { WFMEvent } from '../../shared/models/event.model';

@Component({
  selector: 'wfm-history-event',
  templateUrl: './history-event.component.html',
  styleUrls: ['./history-event.component.scss']
})
export class HistoryEventComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() events: WFMEvent[] = [];
  searchValue = '';
  searchPlaceHolder = 'Сумма';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find((c) => c.id === e.category).name;
    });
  }

  getEventClass(e: WFMEvent) {
    return {
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income',
      'label': true
    };
  }

  changeCriteria(field: string) {

    const namesMap = {
      amount: 'Сумма',
      category: 'Категория',
      date: 'Дата',
      type: 'Тип'
    };

    this.searchPlaceHolder = namesMap[field];
    this.searchField = field;
  }

}
