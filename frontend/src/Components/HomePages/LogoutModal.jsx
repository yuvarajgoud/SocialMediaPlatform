// LogoutModal.js
import React from 'react';
import Modal from 'react-modal';
import './LogoutModal.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '10px',
    border: '1px solid #ccc',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const LogoutModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Logout Confirmation"
    >
      <h2>Do you really want to logout?</h2>
      <div className="modal-buttons">
        <button onClick={onConfirm} className="modal-button confirm">Yes</button>
        <button onClick={onRequestClose} className="modal-button cancel">No</button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
