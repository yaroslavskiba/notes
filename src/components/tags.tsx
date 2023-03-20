import React from 'react';
import { useAppSelector } from '../store/store';

const TagsList = () => {
  const tagsState = useAppSelector((state) => state.notesList.tags);

  return (
    <>
      {tagsState.map((tag, index) => {
        return (
          <p key={index} className="tag-aside">
            {tag}
          </p>
        );
      })}
    </>
  );
};

export default TagsList;
