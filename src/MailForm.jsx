import React, { useState } from 'react';
import axios from 'axios';

function MailForm() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, settext] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!to.trim()) {
      errors.to = 'Email is required';
    } else if (!isValidEmail(to)) {
      errors.to = 'Invalid email address';
    }
    if (!subject.trim()) {
      errors.subject = 'Subject is required';
    }
    if (!text.trim()) {
      errors.text = 'text is required';
    }
    return errors;
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        await axios.post('http://localhost:8080/send', { to, subject, text });
        alert('Email sent successfully!');
        resetForm();
      } catch (error) {
        alert('Failed to send email');
        console.error('Error sending email:', error);
      }
    } else {
      setErrors(errors);
    }
  };

  const resetForm = () => {
    setTo('');
    setSubject('');
    settext('');
    setErrors({});
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="input-container">
          <label htmlFor="to">To</label>
          <input
            id="to"
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className={` ${errors.to ? 'error' : ''}`}
          />
          {errors.to && <div className="error-message">{errors.to}</div>}
        </div>

        <div className="input-container">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={` ${errors.subject ? 'error' : ''}`}
          />
          {errors.subject && <div className="error-message">{errors.subject}</div>}
        </div>

        <div className="input-container">
          <label htmlFor="text">text</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => settext(e.target.value)}
            className={` ${errors.text ? 'error' : ''}`}
          />
          {errors.text && <div className="error-message">{errors.text}</div>}
        </div>

        <button type="submit" className="bg-blue-500 text-white rounded p-2">
          Send Email
        </button>
      </form>
    </>
  );
}

export default MailForm;
