import {
  Component,
  input,
  output
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
  
  deleteClicked = output<number>();

  onDelete() {

    this.deleteClicked.emit(
      this.note().id
    );

  }


  edit =
    output<number>();

  delete =
    output<number>();

  onEdit() {

    this.edit.emit(
      this.note().id
    );

  }

}