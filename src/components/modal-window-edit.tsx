import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editNote } from '../store/slices/notes-state';
import { AppDispatch } from '../store/store';
import { AiOutlineClose } from 'react-icons/ai';
import { CiSaveDown2 } from 'react-icons/ci';
import { addBaseNote } from '../store/slices/base-state';
import { Note } from '../store/slices/notes-state';

type ModalWindowEditProps = {
  setModalEditIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteItem: Note;
};

const ModalWindowEdit = ({ setModalEditIsOpen, noteItem }: ModalWindowEditProps) => {
  const [titleState, setTitleState] = useState(noteItem.title);
  const [textAreaState, setTextAreaState] = useState(noteItem.text);
  const idState = noteItem.id;
  const dispatch: AppDispatch = useDispatch();

  const serchTags = (text: string) => {
    const tagsList = text
      .split('\n')
      .join(' ')
      .split(' ')
      .filter((word) => word.startsWith('#') && word.length > 1);
    return tagsList.map((tag) => tag.slice(1));
  };

  const handleClickSave = () => {
    const copyText = textAreaState;
    const tags = serchTags(copyText);
    const title = titleState;
    const text = textAreaState;
    const id = idState;
    dispatch(editNote({ id, title, text, tags }));
    dispatch(addBaseNote({ id, title, text, tags }));
    setModalEditIsOpen(false);
  };

  const handleTitleChange = (e: { target: { value: string } }) => {
    const current = e.target.value;
    setTitleState(current);
  };

  const handleTextAreaChange = (e: { target: { value: string } }) => {
    const current = e.target.value;
    setTextAreaState(current);
  };

  const handleClose = () => {
    setModalEditIsOpen(false);
  };

  return (
    <div className="modal-container">
      <div className="modal-header">
        <p>Создание заметки:</p>
        <button className="icon-button" onClick={handleClose}>
          <AiOutlineClose />
        </button>
      </div>
      <input
        type="text"
        className="input-text note-modal"
        onChange={handleTitleChange}
        value={titleState}
        placeholder="Note title"
        maxLength={15}
      />
      <textarea
        name="note-text"
        className="note-text"
        rows={15}
        onChange={handleTextAreaChange}
        value={textAreaState}
        placeholder="Note text"
      />
      {titleState === '' || textAreaState === '' ? (
        <button className="button-text" onClick={handleClickSave} disabled>
          Save <CiSaveDown2 />
        </button>
      ) : (
        <button className="button-text" onClick={handleClickSave}>
          Save <CiSaveDown2 />
        </button>
      )}
    </div>
  );
};

export default ModalWindowEdit;
