import {
  Component,
  input
} from '@angular/core';

import { Note }
from '../../../../core/models/note.model';

@Component({
  selector: 'app-note-card',
  standalone: true,
  templateUrl: './note-card.component.html'
})
export class NoteCardComponent {

  note =
    input.required<Note>();

}