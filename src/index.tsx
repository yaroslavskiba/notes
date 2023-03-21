import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import store, { AppDispatch } from './store/store';
import Modal from 'react-modal';
import { MdOutlineCreate } from 'react-icons/md';
import ModalWindow from './components/modal-window-create';
import NoteItem from './components/note';
import { setSelectedTag } from './store/slices/notes-state';
import './index.css';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const hancleCreate = () => {
    setModalIsOpen(true);
  };
  const handleReset = () => {
    dispatch(setSelectedTag(''));
  };

  return (
    <div className="wrapper">
      <button className="button-text reset" onClick={handleReset}>
        Сброс
      </button>
      <main className="main">
        <div className="main-notes-container">
          <NoteItem />
          <button className="icon-button square" onClick={hancleCreate}>
            <MdOutlineCreate />
          </button>
          <Modal
            isOpen={modalIsOpen}
            className="modal-window-component"
            overlayClassName="modal-overlay-component"
            ariaHideApp={false}
          >
            <ModalWindow setModalIsOpen={setModalIsOpen} />
          </Modal>
        </div>
      </main>
      <footer className="footer">
        <p>Created by Pavel Vorobiov</p>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
}
