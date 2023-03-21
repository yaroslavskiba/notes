import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../store/slices/notes-state';
import { AppDispatch, useAppSelector } from '../store/store';
import { AiOutlineClose } from 'react-icons/ai';
import { CiSaveDown2 } from 'react-icons/ci';
import { addBaseNote } from '../store/slices/base-state';

interface Props {
  setModalIsOpen: (value: boolean) => void;
}

const ModalWindow = ({ setModalIsOpen }: Props) => {
  const [titleState, setTitleState] = useState('');
  const [textAreaState, setTextAreaState] = useState(``);
  const storeState = useAppSelector((state) => state.notesList.notes);

  const dispatch: AppDispatch = useDispatch();

  const serchTags = (text: string) => {
    const tagsList = text
      .split('\n')
      .join(' ')
      .split(' ')
      .filter((word) => word.startsWith('#') && word.length > 1);
    return tagsList.map((tag) => tag.slice(1));
  };

  const generateUniqId = () => {
    const firstPart = Date.now().toString(36);
    const secondPart = Math.random().toString(36).substring(2, 8);
    return `${firstPart}-${secondPart}`;
  };

  const handleClickSave = () => {
    const copyText = textAreaState;
    const tags = serchTags(copyText);
    const title = titleState;
    const text = textAreaState;
    const id = generateUniqId();
    dispatch(addNote({ id, title, text, tags }));
    dispatch(addBaseNote([...storeState]));
    setModalIsOpen(false);
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
    setModalIsOpen(false);
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

export default ModalWindow;
