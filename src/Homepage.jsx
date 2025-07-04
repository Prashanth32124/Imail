import React, { useState } from 'react';
import Compose from './Compose';
import Inbox from './Inbox';
import './css/Homepage.css';

function Homepage() {
  const [view, setView] = useState('inbox');

  return (
    <div>
      <div className="header">📧 iMail</div>
      <div className="nav-buttons">
        <button onClick={() => setView('compose')}>Compose</button>
        <button onClick={() => setView('inbox')}>Inbox</button>
      </div>
      {view === 'compose' && <Compose />}
      {view === 'inbox' && <Inbox />}
    </div>
  );
}

export default Homepage;