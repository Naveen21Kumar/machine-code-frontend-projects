import AccordionItem from './AccordionItem';
import { useState } from 'react';
import '../styles/Accordion.css';

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  function toggleIndex(index) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <div className='accordion'>
      {items.map((item, index) => {
        return (
          <AccordionItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => toggleIndex(index)}
          />
        );
      })}
    </div>
  );
};

export default Accordion;
