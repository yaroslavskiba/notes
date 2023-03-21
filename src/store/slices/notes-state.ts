import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Note = {
  id: string;
  title: string;
  text: string;
  tags: string[];
};

interface NotesStruct<T extends Note> {
  notes: Array<T>;
  tags: string[];
}

const initialState: NotesStruct<Note> = {
  notes: [],
  tags: [],
};

const notesSlice = createSlice({
  name: 'notes-state',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    addTag: (state, action: PayloadAction<string>) => {
      state.tags.push(action.payload);
    },
    filterTag: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.tags.includes(action.payload));
    },
    replaceAllNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state.notes.splice(index, 1, action.payload);
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload);
      if (index !== -1) {
        state.notes.splice(index, 1);
      }
    },
  },
});

export const { addNote, addTag, filterTag, replaceAllNotes, editNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
