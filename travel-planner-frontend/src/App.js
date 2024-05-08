import React from 'react';
import LocalList from './components/LocalList';
import AddLocal from './components/AddLocal';

function App() {
  return (
    <div className="App">
      <AddLocal />
      <LocalList />
    </div>
  );
}

export default App;
