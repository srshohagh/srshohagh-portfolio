'use client';
import { useState } from 'react';
import { WaIcon, MailIcon, Ico } from './Icons';

const NUMBER = '8801875601397';
const EMAIL = 'Shahedur6@gmail.com';

// No server needed: the message opens WhatsApp or the visitor's email app, ready to send.
export default function ContactForm() {
  const [via, setVia] = useState('whatsapp');
  const [status, setStatus] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') || '').trim();
    const reach = String(f.get('reach') || '').trim();
    const msg = String(f.get('message') || '').trim();
    if (!name || !msg) return setStatus('Please add your name and a message.');
    const text = `Hi Shohagh, this is ${name}.\n\n${msg}${reach ? `\n\nYou can reach me at: ${reach}` : ''}`;
    if (via === 'whatsapp') {
      window.open(`https://wa.me/${NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      setStatus('Opening WhatsApp with your message ready to send.');
    } else {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Portfolio inquiry from ${name}`)}&body=${encodeURIComponent(text)}`;
      setStatus('Opening your email app with your message ready to send.');
    }
  };

  return (
    <form className="mailcard" onSubmit={onSubmit} noValidate>
      <span className="stamp" aria-hidden="true"><Ico n="mail" /></span>
      <h3>Send a message</h3>
      <p className="hint">Write your message and choose how you would like to send it.</p>

      <div className="field"><label htmlFor="cf-name">Your name</label><input id="cf-name" name="name" autoComplete="name" required /></div>
      <div className="field"><label htmlFor="cf-reach">Your email or phone (optional)</label><input id="cf-reach" name="reach" autoComplete="email" /></div>
      <div className="field"><label htmlFor="cf-msg">Message</label><textarea id="cf-msg" name="message" required placeholder="Tell me about your project or question..." /></div>

      <fieldset className="via">
        <legend>Send via</legend>
        <label className="wa"><input type="radio" name="via" checked={via === 'whatsapp'} onChange={() => setVia('whatsapp')} /><span><WaIcon />WhatsApp</span></label>
        <label className="em"><input type="radio" name="via" checked={via === 'email'} onChange={() => setVia('email')} /><span><MailIcon />Email</span></label>
      </fieldset>

      <button type="submit" className={`btn send ${via === 'whatsapp' ? 'wa' : 'em'}`}>
        {via === 'whatsapp' ? <WaIcon /> : <MailIcon />}Send via {via === 'whatsapp' ? 'WhatsApp' : 'Email'}
      </button>
      <p className="status" role="status" aria-live="polite">{status}</p>
      <p className="formnote">This opens WhatsApp or your email app with your message ready to send. Nothing is stored on this website.</p>
    </form>
  );
}
