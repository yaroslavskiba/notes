import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import Modal from 'react-modal';
import { MdOutlineCreate } from 'react-icons/md';
import './index.css';
import ModalWindow from './components/modal-window-create';

const App = () => {
  const [serchState, setSearchState] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleChange = (e: { target: { value: string } }) => {
    const current = e.target.value;
    setSearchState(current);
  };

  const hancleCreate = () => {
    setModalIsOpen(true);
  };

  return (
    <div className="wrapper">
      <header className="header">
        <input
          type="text"
          className="input-text search"
          value={serchState}
          onChange={handleChange}
          placeholder="Search by tags"
        />
      </header>
      <main className="main">
        <aside className="taglist">{}</aside>
        <div className="main-notes-container">
          {}
          <button className="icon-button square" onClick={hancleCreate}>
            <MdOutlineCreate />
          </button>
          <Modal isOpen={modalIsOpen} className="modal-window-component" overlayClassName="modal-overlay-component">
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
