import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Note = {
  id: string;
  title: string;
  text: string;
  tags: string[];
};

interface NotesStruct<T extends Note> {
  notes: Array<T>;
}

const initialState: NotesStruct<Note> = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes-state',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
  },
});

export const { addNote } = notesSlice.actions;
export default notesSlice.reducer;
