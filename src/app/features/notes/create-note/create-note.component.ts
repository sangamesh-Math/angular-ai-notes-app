import {
  Component,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  NoteService
} from '../../../core/services/note.service';

import { NotesStore }
from '../store/notes.store';


@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css'
})
export class CreateNoteComponent {

  private fb =
    inject(FormBuilder);

  private noteService =
    inject(NoteService);

  private router =
    inject(Router);

  private store =
  inject(NotesStore);

  noteForm =
    this.fb.group({
      title: [
        '',
        Validators.required
      ],
      category: [
        'Learning',
        Validators.required
      ],
      content: [
        '',
        Validators.required
      ]
    });

  saveNote() {

    if (
      this.noteForm.invalid
    ) {
      this.noteForm.markAllAsTouched();
      return;
    }

    const formValue =
      this.noteForm.getRawValue();

    const note = {
      title:
        formValue.title!,
      category:
        formValue.category!,
      content:
        formValue.content!,
      createdAt:
        new Date()
          .toISOString()
          .split('T')[0]
    };

    this.noteService
      .createNote(note)
      .subscribe({
        next: createdNote => {

  this.store.addNote(
    createdNote
  );

  this.router.navigate([
    '/notes'
  ]);

},
        error: error => {

          console.error(
            error
          );

        }
      });

  }

}