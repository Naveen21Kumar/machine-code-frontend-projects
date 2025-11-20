import Tabs from './components/Tabs';

function App() {
  const tabData = [
    {
      label: 'profile',
      content: <div>Your profile info goes here.</div>,
    },
    {
      label: 'settings',
      content: <div>Settings panel content.</div>,
    },
    {
      label: 'billing',
      content: <div>Billing information here.</div>,
    },
  ];

  return (
    <>
      <h2>Tabs Demo</h2>
      <Tabs tabs={tabData} />
    </>
  );
}

export default App;
