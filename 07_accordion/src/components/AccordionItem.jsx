const AccordionItem = ({ item, isOpen, onClick }) => {
  const { title, content } = item;
  return (
    <div className='accordion-item'>
      <button className='accordion-header' onClick={onClick}>
        {title}
        <span className='arrow'>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className='accordion-body'>{content}</div>}
    </div>
  );
};

export default AccordionItem;
