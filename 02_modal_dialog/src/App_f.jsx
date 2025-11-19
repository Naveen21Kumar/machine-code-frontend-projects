import { useState } from 'react';
import Modal_f from './Modal_f';

export default function App_f() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal_f isOpen={open} onClose={() => setOpen(false)}>
        <h2>Modal Title</h2>
        <p>This is some content inside the modal.</p>
        <button onClick={() => alert('Clicked inside modal!')}>Click Me</button>
        <button onClick={() => setOpen(false)}>Close Modal</button>
      </Modal_f>
    </div>
  );
}
