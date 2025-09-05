import React, { useState, useEffect } from 'react';
import { CRITERIA } from '../constants';
import { ScoreDetails } from '../types';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';
import PlusIcon from './icons/PlusIcon';

type ApartmentType = 'large' | 'small';

interface PlayerFormProps {
  onAddPlayer: (name: string, score: number, scoreDetails: ScoreDetails, apartmentType: ApartmentType) => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ onAddPlayer }) => {
  const [name, setName] = useState('');
  const [apartmentType, setApartmentType] = useState<ApartmentType>('large');
  const [hifz, setHifz] = useState('');
  const [metn, setMetn] = useState('');
  const [children, setChildren] = useState('');
  const [dawahHours, setDawahHours] = useState('');
  const [totalScore, setTotalScore] = useState(0);
  const [scoreDetails, setScoreDetails] = useState<ScoreDetails>({});

  useEffect(() => {
    const values = {
      hifz: parseInt(hifz, 10) || 0,
      metn: parseInt(metn, 10) || 0,
      children: parseInt(children, 10) || 0,
      dawahHours: parseInt(dawahHours, 10) || 0,
    };

    let currentScore = 0;
    const details: ScoreDetails = {};

    CRITERIA.forEach(criterion => {
      const value = values[criterion.id];
      const points = value * criterion.pointsPerUnit;
      currentScore += points;
      details[criterion.id] = { points, value };
    });

    setTotalScore(currentScore);
    setScoreDetails(details);
  }, [name, hifz, metn, children, dawahHours]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddPlayer(name.trim(), totalScore, scoreDetails, apartmentType);
      setName('');
      setHifz('');
      setMetn('');
      setChildren('');
      setDawahHours('');
    }
  };

  const isAddButtonDisabled = name.trim().length < 2;

  return (
    <div className="card-container">
      <h2>Dodaj Kandidata</h2>
      <form onSubmit={handleSubmit} className="player-form">
        <div className="form-group">
          <label htmlFor="name">
            Ime i prezime
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Npr. Hasan Hasanović"
            className="form-input"
          />
        </div>

        <div className="form-group">
            <label>
                Tip stana za apliciranje
            </label>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        name="apartmentType"
                        value="large"
                        checked={apartmentType === 'large'}
                        onChange={() => setApartmentType('large')}
                    />
                    <span>Veliki stan</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="apartmentType"
                        value="small"
                        checked={apartmentType === 'small'}
                        onChange={() => setApartmentType('small')}
                    />
                    <span>Mali stan</span>
                </label>
            </div>
        </div>
        
        <div className="criteria-grid">
          {CRITERIA.map(criterion => (
            <div key={criterion.id} className="form-group">
              <label htmlFor={criterion.id}>
                {criterion.label}
              </label>
              <input
                type="number"
                id={criterion.id}
                min="0"
                value={{ hifz, metn, children, dawahHours }[criterion.id]}
                onChange={(e) => {
                  const setters = {
                    hifz: setHifz,
                    metn: setMetn,
                    children: setChildren,
                    dawahHours: setDawahHours,
                  };
                  setters[criterion.id](e.target.value);
                }}
                placeholder="0"
                className="form-input"
              />
            </div>
          ))}
        </div>
        
        <div className="score-breakdown">
          <h3>Bodovi po kriterijima:</h3>
          {CRITERIA.map(criterion => {
            const detail = scoreDetails[criterion.id];
            const achieved = detail ? detail.points > 0 : false;
            
            return (
              <div key={criterion.id} className="score-item">
                <div className="description">
                   {achieved ? <CheckIcon className="icon icon-success"/> : <XIcon className="icon icon-fail"/>}
                   <span>{criterion.description}</span>
                </div>
                <span className={`points ${achieved ? 'points-success' : ''}`}>
                    {detail ? detail.points : 0}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="total-score">
            <span className="label">Ukupno bodova:</span>
            <span className="score">{totalScore}</span>
        </div>

        <button
          type="submit"
          disabled={isAddButtonDisabled}
          className="button button-primary"
        >
          <PlusIcon className="icon" />
          Dodaj na listu
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;