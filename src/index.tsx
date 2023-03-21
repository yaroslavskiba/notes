import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import Modal from 'react-modal';
import { MdOutlineCreate } from 'react-icons/md';
import './index.css';
import ModalWindow from './components/modal-window-create';
import NoteItem from './components/note';
import TagsList from './components/tags';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const hancleCreate = () => {
    setModalIsOpen(true);
  };

  return (
    <div className="wrapper">
      <main className="main">
        <aside className="taglist">
          <TagsList />
        </aside>
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
