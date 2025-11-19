import './Pagination';

const getPages = (currentPage, totalPages) => {
  if (totalPages === 1) {
    return 1;
  }

  let pages = [];

  const firstPage = 1;
  const lastPage = totalPages;
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  // firstPage
  pages.push(firstPage);

  // check and add ellipses
  if (Math.abs(firstPage - previousPage) > 1) {
    pages.push('...');
  }

  // prevPage
  if (firstPage < previousPage) {
    pages.push(previousPage);
  }

  // currentPage
  if (currentPage !== firstPage && currentPage !== lastPage) {
    pages.push(currentPage);
  }

  //nextPage
  if (nextPage < lastPage) {
    pages.push(nextPage);
  }

  // check and Ellipses
  if (Math.abs(nextPage - lastPage) > 1) {
    pages.push('...');
  }

  // lastPage
  pages.push(lastPage);

  return pages;
};

const Pagination = ({ currentPage, onChange, totalPages }) => {
  const generateLinks = () => {
    // let links = [];
    // for (let i = 0; i < totalPages; i++) {
    //   const page = i + 1;
    //   links.push(
    //     <li
    //       key={page}
    //       className={page === currentPage ? 'active' : ''}
    //       onClick={() => onChange(page)}>
    //       {page}
    //     </li>
    //   );
    // }
    // return links;

    const links = getPages(currentPage, totalPages);
    return links.map((link, index) => {
      return (
        <li
          key={index}
          className={link === currentPage ? 'active' : ''}
          onClick={() => {
            if (!isNaN(link)) {
              onChange(link);
            }
          }}>
          {link}
        </li>
      );
    });
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
