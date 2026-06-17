import { Component, signal } from '@angular/core';
import { StatsCardComponent } from '../components/stats-card/stats-card.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { FilterBarComponent } from '../components/filter-bar/filter-bar.component';
import { inject } from '@angular/core';
import { NotesStore } from '../store/notes.store';
import { NoteCardComponent } from '../components/note-card/note-card.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [
    StatsCardComponent,
    SearchBarComponent,
    FilterBarComponent,
    NoteCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  store =
    inject(NotesStore);
  private router =
  inject(Router);
    onSearchChanged(value: string) {

  console.log('Dashboard received:', value);

  this.store.searchText.set(value);

}

editNote(id: number) {

  this.router.navigate([
    '/notes/edit',
    id
  ]);

}
}


