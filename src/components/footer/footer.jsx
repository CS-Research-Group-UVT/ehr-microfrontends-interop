import React from 'react';
import './footer.sass';

const Footer = () => (
  <footer className="app-footer">
    <div className="footer-content">
      <span>© {new Date().getFullYear()} CDSS Widgets</span>
      <span className="footer-links">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span className="footer-sep">|</span>
        <a href="/about">About</a>
      </span>
    </div>
  </footer>
);

export default Footer;

