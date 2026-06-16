import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  templateUrl: './stats-card.component.html'
})
export class StatsCardComponent {
  title = input.required<string>();
  count = input.required<number>();
}
