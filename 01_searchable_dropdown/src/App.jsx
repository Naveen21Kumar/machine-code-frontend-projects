import SearchableDropdown from './SearchableDropdown';
import './App.css';
import { useState } from 'react';

const options = [
  { value: 1, label: 'India' },
  { value: 2, label: 'Indonesia' },
  { value: 3, label: 'United States' },
  { value: 4, label: 'United Kingdom' },
  { value: 5, label: 'Japan' },
  { value: 6, label: 'China' },
];

const App = () => {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ padding: '40px' }}>
      <h1>Searchable Dropdown Demo</h1>
      <SearchableDropdown
        options={options}
        value={selected}
        onChange={setSelected}
      />
      <h2>Selected: {selected?.label}</h2>
    </div>
  );
};

export default App;
