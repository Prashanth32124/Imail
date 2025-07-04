import React, { useEffect, useState } from 'react';
import api from './api';
import './css/Inbox.css';

function Inbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await api.post("/inbox", { username });
        setMessages(res.data.messages);
      } catch (err) {
        console.error("❌ Inbox fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInbox();
  }, [username]);

  if (selected !== null) {
    const msg = messages[selected];
    return (
      <div className="message-detail">
        <div className="back-button" onClick={() => setSelected(null)}>&larr; Back to Inbox</div>
        <h4>{msg.subject}</h4>
        <p><b>From:</b> {msg.from}</p>
        <p>{msg.body}</p>
        <small>{new Date(msg.timestamp).toLocaleString()}</small>
      </div>
    );
  }

  return (
    <div className="inbox-container">
      <h3>Inbox</h3>
      {loading ? (
        <p>Loading...</p>
      ) : messages.length === 0 ? (
        <p>No messages</p>
      ) : (
        messages.map((msg, i) => (
          <div
            key={i}
            className={`message-box ${msg.seen ? 'seen' : 'unseen'}`}
            onClick={() => setSelected(i)}
          >
            <p><b>From:</b> {msg.from}</p>
            <p><b>Subject:</b> {msg.subject}</p>
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
            <p className="status-tag">{msg.seen ? "👁️ Seen" : "🕒 Unseen"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Inbox;