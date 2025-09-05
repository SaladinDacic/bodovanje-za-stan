export interface ScoreDetails {
  [key: string]: {
    points: number;
    value: number;
  };
}

export interface Candidate {
  uuid: string;
  name: string;
  score: number;
  scoreDetails: ScoreDetails;
  apartmentType: 'large' | 'small';
}