import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/notes';

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  createNote(
    note: Omit<Note, 'id'>
  ): Observable<Note> {

    return this.http.post<Note>(
      this.apiUrl,
      note
    );

  }

  getNoteById(
    id: number
  ): Observable<Note> {

    return this.http.get<Note>(
      `${this.apiUrl}/${id}`
    );

  }

  updateNote(
    id: number,
    note: Note
  ): Observable<Note> {

    return this.http.put<Note>(
      `${this.apiUrl}/${id}`,
      note
    );

  }

    deleteNote(
  id: number
): Observable<void> {

  return this.http.delete<void>(
    `${this.apiUrl}/${id}`
  );

}

}