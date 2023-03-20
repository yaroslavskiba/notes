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
  },
});

export const { addNote, addTag } = notesSlice.actions;
export default notesSlice.reducer;
