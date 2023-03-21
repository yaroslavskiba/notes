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

const baseNotesSlice = createSlice({
  name: 'notes-state',
  initialState,
  reducers: {
    addBaseNote: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
  },
});

export const { addBaseNote } = baseNotesSlice.actions;
export default baseNotesSlice.reducer;
