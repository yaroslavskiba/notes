import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTag, filterTag, replaceAllNotes } from '../store/slices/notes-state';
import { AppDispatch, useAppSelector } from '../store/store';
import { AiOutlineClose } from 'react-icons/ai';

const TagsList = () => {
  const tagsState = useAppSelector((state) => state.notesList.tags);
  console.log(tagsState);
  const dispatch: AppDispatch = useDispatch();
  const base = useAppSelector((state) => state.baseNotesList.notes);

  const onFilterNotes = (tag: string) => {
    dispatch(filterTag(tag));
  };

  const handleReset = () => {
    const copy = [...base];
    dispatch(replaceAllNotes(copy));
  };

  const handleDelete = (index: number) => {
    dispatch(deleteTag(index));
  };

  return (
    <>
      {tagsState.map((tag: string, index) => {
        return (
          <>
            <div className="tags-control" key={index}>
              <button className="tag-aside" onClick={() => onFilterNotes(tag)}>
                {tag}
              </button>
              <button className="icon-button" onClick={() => handleDelete(index)}>
                <AiOutlineClose />
              </button>
            </div>
          </>
        );
      })}
      <button className="button-text" onClick={handleReset}>
        Reset
      </button>
    </>
  );
};

export default TagsList;
