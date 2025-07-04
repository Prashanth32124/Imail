import React, { useState } from 'react';
import api from './api';
import './css/Compose.css';

function Compose() {
  const [todata, setTodata] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleEmailValidation = async () => {
    const emailToValidate = todata.trim();

    if (!emailToValidate) {
      setValidationMessage("Please enter an email address.");
      return;
    }

    try {
      const res = await api.post('/check-email', { email: emailToValidate });
      setValidationMessage(res.data.message);
    } catch (err) {
      setValidationMessage(err.response?.data?.message || "An unknown error occurred during validation.");
    }
  };

  const handleSend = async () => {
    const from = localStorage.getItem("username") || "Anonymous";

    if (!todata || !subject || !body) {
      setValidationMessage("Please fill in all fields (To, Subject, Body)."); // Use validation message state
      return;
    }

    try {
      const res = await api.post('/send-mail', { from, to: todata.trim(), subject, body });
      setValidationMessage(res.data.message); // Use validation message state for success too
      setTodata('');
      setSubject('');
      setBody('');
      setValidationMessage('');
    } catch (err) {
      setValidationMessage(err.response?.data?.message || "Failed to send mail."); // Use validation message state for error
    }
  };

  return (
    <div className="compose-container">
      <h3>Compose</h3>
      <input
        placeholder="To"
        value={todata}
        onChange={e => setTodata(e.target.value)}
      />
      <button onClick={handleEmailValidation}>Validate</button>
      <p className="validation-message">{validationMessage}</p>
      <input
        placeholder="Subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Compose;