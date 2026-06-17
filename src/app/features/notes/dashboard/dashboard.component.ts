import { Component, signal } from '@angular/core';
import { StatsCardComponent } from '../components/stats-card/stats-card.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { FilterBarComponent } from '../components/filter-bar/filter-bar.component';
import { inject } from '@angular/core';
import { NotesStore } from '../store/notes.store';
import { NoteCardComponent } from '../components/note-card/note-card.component';
import { Router } from '@angular/router';
import { NoteService }
from '../../../core/services/note.service';
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
private noteService =
  inject(NoteService);
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

deleteNote(id: number) {

  const confirmed =
    confirm(
      'Are you sure you want to delete this note?'
    );

  if (!confirmed) {
    return;
  }

  this.noteService
    .deleteNote(id)
    .subscribe({

      next: () => {

        this.store.removeNote(
          id
        );

      },

      error: error => {

        console.error(
          'Delete failed',
          error
        );

      }

    });

}
}


