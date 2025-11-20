import { useState, useRef } from 'react';
import '../styles/Tabs.css';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRef = useRef([]);

  function handleKeyDown(e, index) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveTab((next) => (next + 1) % tabs.length);
      // tabRef.current[next].focus();
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
      // tabRef.current[prev].focus();
    }

    if (e.key === 'enter') {
      e.preventDefault();
      setActiveTab(index);
    }
  }

  // function handleKeyDown(e, index) {
  //   const key = e.key;

  //   if (key === 'ArrowRight') {
  //     e.preventDefault();
  //     const next = (index + 1) % tabs.length;
  //     setActiveTab(next);

  //     const el = tabRef.current[next];
  //     if (el) el.focus();
  //     return;
  //   }

  //   if (key === 'ArrowLeft') {
  //     e.preventDefault();
  //     const prev = (index - 1 + tabs.length) % tabs.length;
  //     setActiveTab(prev);

  //     const elPrev = tabRef.current[prev];
  //     if (elPrev) elPrev.focus();
  //     return;
  //   }

  //   if (key === 'Enter') {
  //     e.preventDefault();
  //     setActiveTab(index);

  //     const elCurrent = tabRef.current[index];
  //     if (elCurrent) elCurrent.focus();
  //     return;
  //   }
  // }

  return (
    <div className='tab-container'>
      <div className='tab-headers'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-btn ${index === activeTab ? 'active-tab' : ''}`}
            onClick={() => setActiveTab(index)}
            ref={(element) => tabRef.current[index] === element}
            onKeyDown={(e) => handleKeyDown(e, index)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className='tab-panel'>{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;

// Short answer: NO — you do not need useRef unless you want the “focus moves to next tab” behavior.

// Let me explain clearly.

// ✅ If your requirement is ONLY:

// Change active tab with ArrowRight

// Change active tab with ArrowLeft

// Change active tab with Enter

// Render new panel

// ➡️ You do NOT need useRef at all.

// State alone handles everything.

// 🔥 When do you NEED useRef?

// You only need useRef if you want:

// ✔ Auto-focus on the new tab button when using arrow keys
// (example: pressing ArrowRight makes the next tab button get keyboard focus)

// Without refs → focus stays on the original button
// With refs → focus jumps correctly according to accessibility standards

// 🎯 For your current setup (no focus movement)

// 👉 Remove useRef completely
// 👉 Keep state-only logic
