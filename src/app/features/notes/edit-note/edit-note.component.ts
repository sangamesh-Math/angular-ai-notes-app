import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  NoteService
} from '../../../core/services/note.service';

import {
  NotesStore
} from '../store/notes.store';

import {
  Note
} from '../../../core/models/note.model';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.css'
})
export class EditNoteComponent
  implements OnInit {

  private fb =
    inject(FormBuilder);

  private route =
    inject(ActivatedRoute);

  private router =
    inject(Router);

  private noteService =
    inject(NoteService);

  private store =
    inject(NotesStore);

  noteId = 0;

  noteForm =
    this.fb.group({
      title: [
        '',
        Validators.required
      ],
      category: [
        '',
        Validators.required
      ],
      content: [
        '',
        Validators.required
      ]
    });

  ngOnInit() {

    this.noteId =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    this.loadNote();

  }

  loadNote() {

    this.noteService
      .getNoteById(this.noteId)
      .subscribe({

        next: note => {

          this.noteForm.patchValue({
            title: note.title,
            category: note.category,
            content: note.content
          });

        },

        error: error => {

          console.error(
            'Failed to load note',
            error
          );

        }

      });

  }

  saveChanges() {

    if (
      this.noteForm.invalid
    ) {
      this.noteForm.markAllAsTouched();
      return;
    }

    this.noteService
      .getNoteById(this.noteId)
      .subscribe({

        next: existingNote => {

          const updatedNote: Note = {

            ...existingNote,

            title:
              this.noteForm.value.title!,

            category:
              this.noteForm.value.category!,

            content:
              this.noteForm.value.content!

          };

          this.noteService
            .updateNote(
              this.noteId,
              updatedNote
            )
            .subscribe({

              next: note => {

                this.store.updateNote(
                  note
                );

                this.router.navigate([
                  '/notes'
                ]);

              }

            });

        }

      });

  }

}