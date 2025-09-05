import React, { useState } from 'react';
import { Candidate } from '../types';
import TrophyIcon from './icons/TrophyIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import TrashIcon from './icons/TrashIcon';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { CRITERIA } from '../constants';

interface PlayerListProps {
  players: Candidate[];
  title: string;
  onDeleteCandidate: (uuid: string, apartmentType: 'large' | 'small') => void;
}

const PlayerCard: React.FC<{ player: Candidate; rank: number; onDelete: (uuid: string, apartmentType: 'large' | 'small') => void }> = ({ player, rank, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const rankClass =
    rank === 1 ? 'rank-1' :
    rank === 2 ? 'rank-2' :
    rank === 3 ? 'rank-3' : '';
    
  const relevantCriteria = CRITERIA.filter(
    (criterion) => player.scoreDetails[criterion.id] && player.scoreDetails[criterion.id].value > 0
  );

  const handleConfirmDelete = (password: string) => {
    if (password === 'admin') {
      onDelete(player.uuid, player.apartmentType);
      setIsDeleteModalOpen(false);
    } else {
      alert('Pogrešna šifra! Pokušajte ponovo.');
    }
  };

  return (
    <>
      <li className={`player-card ${rankClass}`}>
        <div className="card-header">
          <div className="player-info">
            <span className="rank">{rank}.</span>
            <div className="name-wrapper" onClick={() => setIsExpanded(!isExpanded)}>
              <p className="name">{player.name}</p>
            </div>
          </div>
          <div className="player-actions">
            <span className="score">{player.score}</span>
            {rank <= 3 && <TrophyIcon className="trophy-icon" />}
             <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="action-button delete-button"
              aria-label={`Obriši kandidata ${player.name}`}
            >
              <TrashIcon className="icon" />
            </button>
            <button onClick={() => setIsExpanded(!isExpanded)} className={`action-button expand-button ${isExpanded ? 'expanded' : ''}`}>
              <ChevronDownIcon className="icon" />
            </button>
          </div>
        </div>

        {isExpanded && relevantCriteria.length > 0 && (
          <div className="card-details animate-fade-in">
            <h4>Detalji bodovanja:</h4>
            {relevantCriteria.map(criterion => {
              const detail = player.scoreDetails[criterion.id];
              return (
                <div key={criterion.id} className="detail-item">
                  <span>{criterion.description}:</span>
                  <span className="value">
                    {`${detail.value} x ${criterion.pointsPerUnit} = ${detail.points} bodova`}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </li>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

const PlayerList: React.FC<PlayerListProps> = ({ players, title, onDeleteCandidate }) => {
  return (
    <div className="card-container">
      <h2>{title}</h2>
      {players.length === 0 ? (
        <div className="empty-list">
          <p>Lista je trenutno prazna.</p>
          <p>Dodajte kandidata da se prikaže ovdje.</p>
        </div>
      ) : (
        <ul className="player-list">
          {players.map((player, index) => (
            <PlayerCard key={player.uuid} player={player} rank={index + 1} onDelete={onDeleteCandidate} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayerList;