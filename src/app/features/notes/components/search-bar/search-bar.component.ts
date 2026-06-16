import {
  Component,
  output
} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {

  searchChanged =
    output<string>();

  onInput(event: Event) {

  const value =
    (event.target as HTMLInputElement)
      .value;

  console.log('Search emitted:', value);

  this.searchChanged.emit(value);

}

test() {
  console.log('Button clicked');
}

}