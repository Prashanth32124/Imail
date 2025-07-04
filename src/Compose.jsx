import React, { useState } from 'react';
import api from './api';
import './css/Compose.css';

function Compose() {
  const [todata, setTodata] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleEmailValidation = async () => {
  try {
    console.log("Validating:", todata); // 👈 Check the input
    const res = await api.post('/check-email', { email: todata });
    console.log("Response:", res.data); // 👈 Check the response
    setValidationMessage(res.data.message);
  } catch (err) {
    console.log("Error:", err.response?.data); // 👈 Inspect error
    setValidationMessage(err.response?.data?.message || "❌ Error");
  }
};


  const handleSend = async () => {
    const from = localStorage.getItem("username") || "Anonymous";
    try {
      const res = await api.post('/send-mail', { from, to: todata, subject, body });
      alert(res.data.message);
      setTodata(''); setSubject(''); setBody(''); setValidationMessage('');
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to send");
    }
  };

  return (
    <div className="compose-container">
      <h3>Compose</h3>
      <input placeholder="To" value={todata} onChange={e => setTodata(e.target.value)} />
      <button onClick={handleEmailValidation}>Validate</button>
      <p>{validationMessage}</p>
      <input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
      <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Compose;