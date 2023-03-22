import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTag, deleteNote, Note, removeTag, setSelectedTag } from '../store/slices/notes-state';
import { AppDispatch, useAppSelector } from '../store/store';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import Modal from 'react-modal';
import ModalWindowEdit from './modal-window-edit';

const NoteItem = () => {
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any>(null);

  const storeState = useAppSelector((state) => state.notesList.notes);
  const storeTags = useAppSelector((state) => state.notesList.tags);
  const selectedTag = useAppSelector((state) => state.notesList.selectedTag);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    storeState.forEach((noteItem) => {
      noteItem.tags.forEach((tag) => {
        if (!storeTags.includes(tag)) {
          dispatch(addTag(tag));
        }
      });
    });
  }, [storeState, storeTags, dispatch]);

  const handleEdit = (noteItem: Note) => {
    setSelectedNote(noteItem);
    setModalEditIsOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteNote(id));
  };

  const handleDeleteTag = (noteId: string, tagIndex: number) => {
    const tagToRemove = storeState.find((note) => note.id === noteId)?.tags[tagIndex];
    dispatch(removeTag({ noteId, tagIndex }));
    if (tagToRemove === selectedTag) {
      dispatch(setSelectedTag(''));
    }
  };

  const handleTagClick = (tag: string) => {
    dispatch(setSelectedTag(tag));
  };

  let filteredNotes = storeState;
  if (selectedTag !== '') {
    filteredNotes = storeState.filter((noteItem) => noteItem.tags.includes(selectedTag));
  }

  return (
    <>
      {filteredNotes.map((noteItem) => (
        <div className="note-item" key={noteItem.id}>
          <div className="note-item-header">
            <h3>{noteItem.title}</h3>
            <div className="note-item-control">
              <button className="icon-button" onClick={() => handleEdit(noteItem)}>
                <AiOutlineEdit />
              </button>
              {selectedNote && (
                <Modal
                  isOpen={modalEditIsOpen}
                  className="modal-window-component"
                  overlayClassName="modal-overlay-component"
                  ariaHideApp={false}
                >
                  <ModalWindowEdit setModalEditIsOpen={setModalEditIsOpen} noteItem={selectedNote} />
                </Modal>
              )}
              <button className="icon-button" onClick={() => handleDelete(noteItem.id)}>
                <AiOutlineClose />
              </button>
            </div>
          </div>
          <p>{noteItem.text}</p>
          {noteItem.tags.map((tag, index) => (
            <div key={`${noteItem.id}-${index}`} className="note-item-tag-container">
              <button className="note-item-tag" onClick={() => handleTagClick(tag)}>
                {tag}
                {selectedTag === tag && <span className="tag-selected-indicator">*</span>}
              </button>
              <button className="delete-button" onClick={() => handleDeleteTag(noteItem.id, index)}>
                <AiOutlineClose />
              </button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default NoteItem;
