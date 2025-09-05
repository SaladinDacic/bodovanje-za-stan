import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Candidate, ScoreDetails } from './types';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import ShareIcon from './components/icons/ShareIcon';

const PrintableLists: React.FC<{ largeCandidates: Candidate[]; smallCandidates: Candidate[] }> = ({ largeCandidates, smallCandidates }) => {
  const PrintableTable: React.FC<{ title: string; candidates: Candidate[] }> = ({ title, candidates }) => {
    if (candidates.length === 0) return null;

    return (
      <div className="printable-table-container">
        <h2>{title}</h2>
        <table>
          <thead>
            <tr>
              <th>Rang</th>
              <th>Ime i prezime</th>
              <th>Ukupno bodova</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={candidate.uuid}>
                <td>{index + 1}</td>
                <td>{candidate.name}</td>
                <td>{candidate.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div id="print-area">
      <h1>Rang Liste Kandidata</h1>
      <PrintableTable title="Lista za Veliki Stan" candidates={largeCandidates} />
      <PrintableTable title="Lista za Mali Stan" candidates={smallCandidates} />
    </div>
  );
};

function App() {
  const [largeApartmentCandidates, setLargeApartmentCandidates] = useState<Candidate[]>(() => {
    try {
      const stored = localStorage.getItem('largeApartmentCandidates');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load large candidates:", e);
      return [];
    }
  });
  const [smallApartmentCandidates, setSmallApartmentCandidates] = useState<Candidate[]>(() => {
     try {
      const stored = localStorage.getItem('smallApartmentCandidates');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load small candidates:", e);
      return [];
    }
  });

  useEffect(() => {
    try {
        localStorage.setItem('largeApartmentCandidates', JSON.stringify(largeApartmentCandidates));
        localStorage.setItem('smallApartmentCandidates', JSON.stringify(smallApartmentCandidates));
    } catch (e) {
        console.error("Failed to save candidates to local storage:", e);
    }
  }, [largeApartmentCandidates, smallApartmentCandidates]);
  
  const addCandidate = useCallback((name: string, score: number, scoreDetails: ScoreDetails, apartmentType: 'large' | 'small') => {
    const newCandidate: Candidate = {
      uuid: window.crypto.randomUUID(),
      name,
      score,
      scoreDetails,
      apartmentType,
    };
    
    if (apartmentType === 'large') {
      if (largeApartmentCandidates.some(c => c.name.trim().toLowerCase() === name.trim().toLowerCase())) {
        alert("Kandidat s ovim imenom već postoji na listi za veliki stan!");
        return;
      }
      setLargeApartmentCandidates(prev => [newCandidate, ...prev]);
    } else {
      if (smallApartmentCandidates.some(c => c.name.trim().toLowerCase() === name.trim().toLowerCase())) {
        alert("Kandidat s ovim imenom već postoji na listi za mali stan!");
        return;
      }
      setSmallApartmentCandidates(prev => [newCandidate, ...prev]);
    }
  }, [largeApartmentCandidates, smallApartmentCandidates]);

  const deleteCandidate = useCallback((uuid: string, apartmentType: 'large' | 'small') => {
    if (apartmentType === 'large') {
      setLargeApartmentCandidates(prev => prev.filter(c => c.uuid !== uuid));
    } else {
      setSmallApartmentCandidates(prev => prev.filter(c => c.uuid !== uuid));
    }
  }, []);

  const sortedLargeCandidates = useMemo(() => {
    return [...largeApartmentCandidates].sort((a, b) => b.score - a.score);
  }, [largeApartmentCandidates]);

  const sortedSmallCandidates = useMemo(() => {
    return [...smallApartmentCandidates].sort((a, b) => b.score - a.score);
  }, [smallApartmentCandidates]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="app-container">
      <PrintableLists largeCandidates={sortedLargeCandidates} smallCandidates={sortedSmallCandidates} />
      <div className="content-wrapper">
        <header className="app-header">
          <h1>
            Kalkulator Bodova za Stan
          </h1>
          <p>Unesite podatke kandidata i odaberite listu za apliciranje.</p>
          
          <div className="print-button-container">
            <button
              onClick={handlePrint}
              className="button button-primary"
            >
              <ShareIcon className="icon" />
              <span>Printaj Liste</span>
            </button>
          </div>
        </header>

        <main className="main-content">
          <div>
             <PlayerForm onAddPlayer={addCandidate} />
          </div>
          <div className="lists-container">
            <PlayerList players={sortedLargeCandidates} title="Lista za Veliki Stan" onDeleteCandidate={deleteCandidate} />
            <PlayerList players={sortedSmallCandidates} title="Lista za Mali Stan" onDeleteCandidate={deleteCandidate} />
          </div>
        </main>
        
        <footer className="app-footer">
            <p>Kreirano s Reactom i CSS-om.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;