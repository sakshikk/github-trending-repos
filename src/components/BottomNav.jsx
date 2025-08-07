import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import '../Styles.css';

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      <button
        className="nav-item active"
        aria-current="page"
        type="button"
      >
        <FaStar className="nav-icon" size={20} aria-hidden="true" />
        <span className="nav-label">Trending</span>
      </button>

      <button
        className="nav-item"
        type="button"
        aria-label="Settings"
      >
        <FiSettings className="nav-icon" size={20} aria-hidden="true" />
        <span className="nav-label">Settings</span>
      </button>
    </nav>
  );
}

export default BottomNav;
