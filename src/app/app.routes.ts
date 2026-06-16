import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './layouts/main-layout/main-layout.component'
      ).then(m => m.MainLayoutComponent),

    children: [
      {
        path: '',
        redirectTo: 'notes',
        pathMatch: 'full'
      },

      {
        path: 'notes',
        loadComponent: () =>
          import(
            './features/notes/dashboard/dashboard.component'
          ).then(m => m.DashboardComponent)
      },

      {
        path: 'notes/create',
        loadComponent: () =>
          import(
            './features/notes/create-note/create-note.component'
          ).then(m => m.CreateNoteComponent)
      },

      {
        path: 'notes/edit/:id',
        loadComponent: () =>
          import(
            './features/notes/edit-note/edit-note.component'
          ).then(m => m.EditNoteComponent)
      }
    ]
  }
];