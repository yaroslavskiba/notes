import React from 'react';
import { useDispatch } from 'react-redux';
import { filterTag, replaceAllNotes } from '../store/slices/notes-state';
import { AppDispatch, useAppSelector } from '../store/store';

const TagsList = () => {
  const tagsState = useAppSelector((state) => state.notesList.tags);
  const dispatch: AppDispatch = useDispatch();
  const base = useAppSelector((state) => state.baseNotesList.notes);

  const onFilterNotes = (tag: string) => {
    dispatch(filterTag(tag));
  };

  const handleReset = () => {
    const copy = [...base];
    dispatch(replaceAllNotes(copy));
  };

  return (
    <>
      {tagsState.map((tag: string, index) => {
        return (
          <button key={index} className="tag-aside" onClick={() => onFilterNotes(tag)}>
            {tag}
          </button>
        );
      })}
      <button className="button-text" onClick={handleReset}>
        Reset
      </button>
    </>
  );
};

export default TagsList;
