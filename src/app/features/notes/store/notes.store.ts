import {
  Injectable,
  computed,
  signal,
  inject
} from '@angular/core';

import { Note } from '../../../core/models/note.model';
import { NoteService } from '../../../core/services/note.service';
@Injectable({
  providedIn: 'root'
})
export class NotesStore {

  private noteService =
    inject(NoteService);

  selectedCategory =
    signal('All');

  searchText =
    signal('');

notes = signal<Note[]>([]);

  loading =
    signal(false);

  constructor() {
    this.loadNotes();
  }

  loadNotes() {

    this.loading.set(true);

    this.noteService
      .getNotes()
      .subscribe({
        next: notes => {

          this.notes.set(notes);

          this.loading.set(false);

        },
        error: error => {

          console.error(
            'Failed to load notes',
            error
          );

          this.loading.set(false);

        }
      });

  }

  addNote(note: Note) {

  this.notes.update(notes => [
    ...notes,
    note
  ]);

}

updateNote(
  updatedNote: Note
) {

  this.notes.update(notes =>
    notes.map(note =>
      note.id === updatedNote.id
        ? updatedNote
        : note
    )
  );

}

  filteredNotes = computed(() => {

    const category =
      this.selectedCategory();

    const search =
      this.searchText()
        .toLowerCase();

    return this.notes().filter(note => {

      const categoryMatch =
        category === 'All'
        || note.category === category;

      const searchMatch =
        note.title
          .toLowerCase()
          .includes(search);

      return (
        categoryMatch &&
        searchMatch
      );

    });

  });

  totalNotes = computed(() => {

  return this.notes().length;

});

learningNotes = computed(() => {

  return this.notes().filter(
    note => note.category === 'Learning'
  ).length;

});

personalNotes = computed(() => {

  return this.notes().filter(
    note => note.category === 'Personal'
  ).length;

});

workNotes = computed(() => {

  return this.notes().filter(
    note => note.category === 'Work'
  ).length;
})



}