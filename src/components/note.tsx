import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTag } from '../store/slices/notes-state';
import { AppDispatch, useAppSelector } from '../store/store';

const Note = () => {
  const storeState = useAppSelector((state) => state.notesList.notes);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    storeState.forEach((noteItem) => {
      noteItem.tags.forEach((tag) => {
        dispatch(addTag(tag));
      });
    });
  }, [storeState, dispatch]);

  return (
    <>
      {storeState.map((noteItem) => (
        <div className="note-item" key={noteItem.id}>
          <h3>{noteItem.title}</h3>
          <pre>{noteItem.text}</pre>
          {noteItem.tags.map((tag, index) => (
            <span key={`${noteItem.id}-${index}`} className="note-item-tag">
              {tag}
            </span>
          ))}
        </div>
      ))}
    </>
  );
};

export default Note;
