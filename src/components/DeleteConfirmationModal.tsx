import React, { useState, useEffect } from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPassword('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      onConfirm(password);
    }
  };

  return (
    <div
      className="modal-backdrop animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Potvrda Brisanja</h3>
        <p>
          Da biste obrisali kandidata, molimo unesite administratorsku šifru.
        </p>
        <form onSubmit={handleConfirm}>
          <div className="form-group">
            <label htmlFor="password-confirm">
              Šifra
            </label>
            <input
              type="password"
              id="password-confirm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Unesite šifru"
              className="form-input"
              autoFocus
            />
          </div>
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="button button-secondary"
            >
              Otkaži
            </button>
            <button
              type="submit"
              disabled={!password}
              className="button button-danger"
            >
              Obriši
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;