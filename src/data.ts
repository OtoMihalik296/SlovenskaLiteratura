import { Topic } from './types';

export const topics: Topic[] = [
  {
    id: 'romanticism',
    name: 'Slovenský romantizmus',
    cards: [
      {
        id: 1,
        question: 'Kto napísal dielo Marína?',
        answer: 'Andrej Sládkovič',
        topic: 'romanticism'
      },
      {
        id: 2,
        question: 'V ktorom roku vyšiel almanach Nitra?',
        answer: '1844',
        topic: 'romanticism'
      },
      {
        id: 3,
        question: 'Kto je autorom zbierky Spevy?',
        answer: 'Samo Chalupka',
        topic: 'romanticism'
      }
    ]
  },
  {
    id: 'realism',
    name: 'Slovenský realizmus',
    cards: [
      {
        id: 4,
        question: 'Kto napísal dielo Dom v stráni?',
        answer: 'Martin Kukučín',
        topic: 'realism'
      },
      {
        id: 5,
        question: 'V ktorom roku vyšlo dielo Keď báčik z Chochoľova umrie?',
        answer: '1890',
        topic: 'realism'
      },
      {
        id: 6,
        question: 'Ktoré dielo napísal Pavol Országh Hviezdoslav?',
        answer: 'Hájnikova žena',
        topic: 'realism'
      }
    ]
  }
];