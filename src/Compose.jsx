// ==== Compose.js ====
import React, { useState } from 'react';
import api from './api'; // Assuming this is correctly configured
import './css/Compose.css';

function Compose() {
  const [todata, setTodata] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleEmailValidation = async () => {
    // Trim whitespace from the input email
    const emailToValidate = todata.trim();

    if (!emailToValidate) {
      setValidationMessage("Please enter an email address.");
      return;
    }

    console.log("Attempting to validate email:", emailToValidate); // 👈 Critical: Check the value *before* sending

    try {
      const res = await api.post('/check-email', { email: emailToValidate });
      console.log("Validation API Response:", res.data); // 👈 Check the full response
      setValidationMessage(res.data.message);
    } catch (err) {
      console.error("Validation API Error:", err); // Log the entire error object
      console.error("Validation API Error Response Data:", err.response?.data); // Log the error response data
      setValidationMessage(err.response?.data?.message || "❌ An unknown error occurred during validation.");
    }
  };

  const handleSend = async () => {
    const from = localStorage.getItem("username") || "Anonymous";
    // Add basic validation before sending
    if (!todata || !subject || !body) {
      alert("Please fill in all fields (To, Subject, Body).");
      return;
    }

    try {
      const res = await api.post('/send-mail', { from, to: todata.trim(), subject, body }); // Trim 'to' here too
      alert(res.data.message);
      setTodata(''); setSubject(''); setBody(''); setValidationMessage('');
    } catch (err) {
      console.error("Send Mail API Error:", err);
      alert(err.response?.data?.message || "❌ Failed to send mail.");
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
      <p className="validation-message">{validationMessage}</p> {/* Add a class for styling */}
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