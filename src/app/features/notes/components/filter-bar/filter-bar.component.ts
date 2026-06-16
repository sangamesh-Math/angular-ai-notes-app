import {
  Component,
  input,
  output
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  templateUrl: './filter-bar.component.html',
  imports: [NgClass]
})
export class FilterBarComponent {

  selectedCategory = input('All');

  categoryChanged =
    output<string>();

  categories = [
    'All',
    'Learning',
    'Work',
    'Personal'
  ];

  selectCategory(category: string) {
    this.categoryChanged.emit(category);
  }
}