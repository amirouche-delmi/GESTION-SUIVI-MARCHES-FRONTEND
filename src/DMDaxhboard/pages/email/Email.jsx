import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'; 
import './Email.scss'

function Email() {
  const [senderEmail, setSenderEmail] = useState('');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/email`, {
        senderEmail,
        recipient,
        subject,
        body
      });
      setSenderEmail('');
      setRecipient('');
      setSubject('');
      setBody('');
      // Afficher une notification de succès avec React Hot Toast
      toast.success('Email envoyé avec succès!', {
        duration: 6000,
        position: "bottom-right"
    });
    } catch (error) {
      // Afficher une notification d'erreur avec React Hot Toast
      toast.error('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.', {
        duration: 6000,
        position: "bottom-right"
    });
    }
    setLoading(false);
  };

  return (
    <div className='email-page'>
      <h2>Envoyer un Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Votre adresse email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Adresse email du destinataire"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Sujet"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          placeholder="Corps de l'email"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        <button type="submit" disabled={loading}>Envoyer</button>
      </form>
    </div>
  );
}

export default Email;
