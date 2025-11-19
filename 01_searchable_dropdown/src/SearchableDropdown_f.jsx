import { useEffect, useRef, useState } from 'react';
import './App.css';

export default function SearchableDropdown({
  options = [],
  value,
  onChange,
  placeholder = 'Search...',
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(0);

  const [internalValue, setInternalValue] = useState(null);
  const selectedValue = value !== undefined ? value : internalValue;

  const ref = useRef();

  // Filter list
  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  // Click outside closes dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  function handleKeyDown(e) {
    if (!open) setOpen(true);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((i) => (i + 1) % filtered.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((i) => (i - 1 + filtered.length) % filtered.length);
    }
    if (e.key === 'Enter') {
      const selected = filtered[highlightIndex];
      if (selected) selectOption(selected);
    }
  }

  function selectOption(option) {
    if (onChange) onChange(option);
    else setInternalValue(option);

    setQuery(option.label);
    setOpen(false);
  }

  return (
    <div className='dropdown-container' ref={ref} onKeyDown={handleKeyDown}>
      <input
        className='dropdown-input'
        value={query}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />

      {open && (
        <ul className='dropdown-list'>
          {filtered.length === 0 && (
            <li className='dropdown-empty'>No results</li>
          )}

          {filtered.map((opt, index) => (
            <li
              key={opt.value}
              className={`dropdown-item ${
                index === highlightIndex ? 'highlight' : ''
              }`}
              onMouseEnter={() => setHighlightIndex(index)}
              onClick={() => selectOption(opt)}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
