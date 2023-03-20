import React from 'react';
import { useDispatch } from 'react-redux';
import { filterTag } from '../store/slices/notes-state';
import { AppDispatch, useAppSelector } from '../store/store';

const TagsList = () => {
  const tagsState = useAppSelector((state) => state.notesList.tags);
  const dispatch: AppDispatch = useDispatch();

  const onFilterNotes = (tag: string) => {
    dispatch(filterTag(tag));
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
    </>
  );
};

export default TagsList;
