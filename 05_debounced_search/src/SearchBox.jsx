import { useState, useEffect, useRef } from 'react';
import './Searchbox.css';

const Searchbox = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const boxRef = useRef();

  async function fetchSuggestions(searchText) {
    // Mock API
    const data = [
      'Apple',
      'Banana',
      'Grapes',
      'Orange',
      'Mango',
      'Pineapple',
      'Peach',
      'Pear',
      'Strawberry',
    ];

    const filtered = data.filter((item) =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );

    setSuggestions(filtered);
    setShowDropdown(true);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleKeyDown(e) {
    if (!showDropdown || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      setHighlightIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === 'ArrowUp') {
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }

    if (e.key === 'Enter') {
      if (highlightIndex >= 0) {
        setQuery(suggestions[highlightIndex]);
        setShowDropdown(false);
      }
    }
  }

  return (
    <div className='search-container' ref={boxRef}>
      <input
        className='search-input'
        type='text'
        placeholder='search here...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />

      {showDropdown && suggestions.length > 0 && (
        <ul className='dropdown'>
          {suggestions.map((item, index) => (
            <li
              key={index}
              className={`dropdown-item ${
                index === highlightIndex ? 'highlight' : ''
              }`}
              onClick={() => {
                setQuery(item);
                setShowDropdown(false);
              }}
              onMouseEnter={() => setHighlightIndex(index)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbox;
