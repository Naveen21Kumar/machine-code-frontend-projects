import Accordion from './components/Accordion';

function App() {
  const items = [
    {
      title: 'What is React?',
      content: 'React is a JavaScript library for building UIs.',
    },
    {
      title: 'Why use React?s',
      content: "Because it's fast and component-based.",
    },
    {
      title: 'How do hooks work?',
      content: 'Hooks let you use state without classes.',
    },
  ];

  return (
    <div>
      <h2>Accordion Demo</h2>
      <Accordion items={items} />
    </div>
  );
}

export default App;
