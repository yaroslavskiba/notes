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
  selectedTag: string;
}

const initialState: NotesStruct<Note> = {
  notes: [],
  tags: [],
  selectedTag: '',
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
    removeTag: (state, action: PayloadAction<{ noteId: string; tagIndex: number }>) => {
      const noteIndex = state.notes.findIndex((note) => note.id === action.payload.noteId);
      if (noteIndex !== -1) {
        state.notes[noteIndex].tags.splice(action.payload.tagIndex, 1);
      }
    },
    setSelectedTag: (state, action: PayloadAction<string>) => {
      state.selectedTag = action.payload;
    },
  },
});

export const { addNote, addTag, replaceAllNotes, editNote, deleteNote, removeTag, setSelectedTag } = notesSlice.actions;
export default notesSlice.reducer;
