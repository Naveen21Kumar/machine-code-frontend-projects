import './Pagination';

const Pagination = ({ currentPage, onChange, totalPages }) => {
  const generateLinks = () => {
    let links = [];
    for (let i = 0; i < totalPages; i++) {
      const page = i + 1;
      links.push(
        <li
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => onChange(page)}>
          {page}
        </li>
      );
    }
    return links;
  };

  function onPrev() {
    if (currentPage > 1) {
      onChange(currentPage - 1);
    }
  }

  function onNext() {
    if (currentPage < totalPages) {
      onChange(currentPage + 1);
    }
  }
  return (
    <div>
      <h2>Current Page: {currentPage}</h2>
      <ul className='links'>
        <li onClick={onPrev}>prev</li>
        {generateLinks()}
        <li onClick={onNext}>next</li>
      </ul>
    </div>
  );
};

export default Pagination;
