import React from 'react';
import ChipComponent from './Components/ChipComponent';

const App = () => {
  const items = [
    'Marina Augustine', 
    'Nick Giannopoulos', 
    'Narayana Garner', 
    'Anita Gros', 
    'Megan Smith',
    'Paul Johnson',
    'Emma Watson',
    'Michael Jordan',
    'Sarah Connor',
    'John Doe'
  ];
  
  return (
    <div className="App">
      <ChipComponent items={items} />
    </div>
  );
};

export default App;
