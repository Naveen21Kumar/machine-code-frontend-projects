import './Pagination_f.css';

/**
 * Props:
 * - currentPage: number (1-indexed)
 * - totalItems: number
 * - pageSize: number
 * - onPageChange: function(pageNumber: number)
 */
export default function Pagination({
  currentPage = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange = () => {},
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Nothing to show if only one page
  if (totalPages <= 1) return null;

  // Helper: build a list of page tokens (numbers or 'ellipsis')
  function getPageTokens() {
    const tokens = [];

    // Always add first page
    tokens.push(1);

    // If there are <= 7 pages, show all
    if (totalPages <= 7) {
      for (let p = 2; p <= totalPages; p++) tokens.push(p);
      return tokens;
    }

    // If lots of pages, show window around current
    const leftWindow = Math.max(2, currentPage - 1);
    const rightWindow = Math.min(totalPages - 1, currentPage + 1);

    // Add left ellipsis if current is far from start
    if (leftWindow > 2) {
      tokens.push('left-ellipsis');
    } else {
      // close to start, include pages 2..leftWindow-1
      for (let p = 2; p < leftWindow; p++) tokens.push(p);
    }

    // Add middle window
    for (let p = leftWindow; p <= rightWindow; p++) {
      tokens.push(p);
    }

    // Add right ellipsis if current is far from end
    if (rightWindow < totalPages - 1) {
      tokens.push('right-ellipsis');
    } else {
      // close to end, include pages rightWindow+1 .. totalPages-1
      for (let p = rightWindow + 1; p <= totalPages - 1; p++) tokens.push(p);
    }

    // Always add last page
    tokens.push(totalPages);

    // De-duplicate while preserving order (defensive)
    const seen = new Set();
    const dedup = [];
    for (const t of tokens) {
      const key = typeof t === 'number' ? `n${t}` : `s${t}`;
      if (!seen.has(key)) {
        seen.add(key);
        dedup.push(t);
      }
    }
    return dedup;
  }

  const tokens = getPageTokens();

  return (
    <div className='pagination'>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        aria-label='Previous page'>
        Prev
      </button>

      {tokens.map((token, idx) =>
        token === 'left-ellipsis' || token === 'right-ellipsis' ? (
          <span key={`e-${idx}`} className='ellipsis'>
            …
          </span>
        ) : (
          <button
            key={`p-${token}`}
            className={token === currentPage ? 'active' : ''}
            onClick={() => {
              // ensure we pass a number to parent
              const pageNumber = Number(token);
              if (pageNumber !== currentPage) onPageChange(pageNumber);
            }}
            aria-current={token === currentPage ? 'page' : undefined}>
            {token}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        aria-label='Next page'>
        Next
      </button>
    </div>
  );
}
