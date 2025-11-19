import { useState } from 'react';
import Pagination_f from './Pagination_f';

export default function App() {
  const [page, setPage] = useState(5);

  return (
    <div style={{ padding: 40 }}>
      <h2>Current Page: {page}</h2>

      <Pagination_f
        currentPage={page}
        totalItems={200}
        pageSize={10}
        onPageChange={setPage}
      />
    </div>
  );
}
