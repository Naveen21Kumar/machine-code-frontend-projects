import { useState } from 'react';
import Modal from './Modal';

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: '40px' }}>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <div>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <h2>Modal Title</h2>
          <p>This is some content in Modal.</p>
          <button onClick={() => alert('Clicked inside Modal')}>
            Click Me
          </button>
          <button onClick={() => setOpen(false)}>Close Modal</button>
        </Modal>
      </div>
    </div>
  );
};

export default App;
