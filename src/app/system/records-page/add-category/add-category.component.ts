import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {
  sub1: Subscription;

  @Output () OnCategoryAdd = new EventEmitter<Category>();

  constructor(public categoriesService: CategoriesService) { }

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;
    if (capacity < 0) {capacity *= -1;
    }

    const category = new Category (name, capacity);

    this.sub1 = this.categoriesService.addCategory(category)
    .subscribe((c: Category) => {
    form.reset();
    form.form.patchValue({capacity: 1});
    this.OnCategoryAdd.emit(c);
    });
  }

  ngOnDestroy() {
    if (this.sub1) { this.sub1.unsubscribe();
    }
  }

}
