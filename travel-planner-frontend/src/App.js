// App.js
import React, { useState } from 'react';
import LocalList from './components/LocalList';
import AddLocal from './components/AddLocal';
import './App.css'; // Importando o CSS

function App() {
  const [needsRefresh, setNeedsRefresh] = useState(true);

  const handleLocalAdd = () => {
    setNeedsRefresh(true);
  };

  return (
    <div className="App">
      <AddLocal onLocalAdded={handleLocalAdd} />
      <LocalList needsRefresh={needsRefresh} setNeedsRefresh={setNeedsRefresh} /> {/* Pass setNeedsRefresh as a prop */}
    </div>
  );
}

export default App;
