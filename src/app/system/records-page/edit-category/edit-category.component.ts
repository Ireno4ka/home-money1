import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Input () categories: Category[] = [];
  @Output () OnCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;

  constructor() { }

  ngOnInit() {
  }

  onCategoryChange() {
    console.log(this.currentCategoryId);

  }

  onSubmit(form: NgForm) {

  }

}
