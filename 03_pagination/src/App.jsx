import { useState } from 'react';
import Pagination from './Pagination';
import './Pagination.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState(4);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        onChange={onPageChange}
        totalPages={10}
      />
    </div>
  );
};

export default App;
