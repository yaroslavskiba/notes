import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Note = {
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
  },
});

export const { addNote, addTag, filterTag } = notesSlice.actions;
export default notesSlice.reducer;
