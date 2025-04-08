export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  topic: string;
}

export interface Topic {
  id: string;
  name: string;
  cards: Flashcard[];
}