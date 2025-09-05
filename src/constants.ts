interface Criterion {
  id: 'hifz' | 'metn' | 'children' | 'dawahHours';
  description: string;
  pointsPerUnit: number;
  label: string;
}

export const CRITERIA: Criterion[] = [
  {
    id: 'hifz',
    description: "Hifz Kur'ana (po džuzevima)",
    label: "Broj džuzeva hifza",
    pointsPerUnit: 10,
  },
  {
    id: 'metn',
    description: 'Naučeni metnovi (po metnu)',
    label: "Broj naučenih metnova",
    pointsPerUnit: 10,
  },
  {
    id: 'children',
    description: 'Broj djece',
    label: "Broj djece",
    pointsPerUnit: 100,
  },
  {
    id: 'dawahHours',
    description: 'Sati u davi sedmično',
    label: "Sati u davi (sedmično)",
    pointsPerUnit: 50,
  },
];