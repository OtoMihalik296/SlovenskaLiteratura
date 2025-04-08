import React, { useState } from 'react';
import { Book, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { topics } from './data';
import { Flashcard } from './components/Flashcard';
import { Topic, Flashcard as FlashcardType } from './types';

function App() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [customTopic, setCustomTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const currentCard = selectedTopic.cards[currentCardIndex];

  const handleNext = () => {
    if (currentCardIndex < selectedTopic.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleTopicChange = (topicId: string) => {
    const newTopic = topics.find(t => t.id === topicId);
    if (newTopic) {
      setSelectedTopic(newTopic);
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  };

  const generateFlashcards = async () => {
    if (!customTopic.trim()) return;
    
    setIsGenerating(true);
    try {
      // Direct call to OpenAI API instead of Supabase function
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that creates educational flashcards. Return your response as a JSON array with 'cards' containing objects with 'question' and 'answer' properties."
            },
            {
              role: "user",
              content: `Generate 5 flashcards about the topic: ${customTopic}, focusing on Slovenská literatúra. Each flashcard should have a question and a detailed answer.`
            }
          ],
          response_format: { type: "json_object" }
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }
  
      const responseData = await response.json();
      const parsedData = JSON.parse(responseData.choices[0].message.content);
      
      const newTopic: Topic = {
        id: customTopic.toLowerCase().replace(/\s+/g, '-'),
        name: customTopic,
        cards: parsedData.cards.map((card: any) => ({
          question: card.question,
          answer: card.answer
        })),
      };
  
      topics.push(newTopic);
      setSelectedTopic(newTopic);
      setCurrentCardIndex(0);
      setCustomTopic('');
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert('Nepodarilo sa vygenerovať kartičky. Skúste to prosím znova.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Book className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">
            Slovenská literatúra
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vyber tému:
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={selectedTopic.id}
                onChange={(e) => handleTopicChange(e.target.value)}
              >
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alebo generuj novú tému:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Zadaj tému (napr. Moderna)"
                  className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={generateFlashcards}
                  disabled={isGenerating || !customTopic.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generujem...
                    </>
                  ) : (
                    'Generovať'
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handlePrevious}
              disabled={currentCardIndex === 0}
              className="p-2 rounded-full bg-white shadow-md disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <Flashcard
              card={currentCard}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(!isFlipped)}
            />

            <button
              onClick={handleNext}
              disabled={currentCardIndex === selectedTopic.cards.length - 1}
              className="p-2 rounded-full bg-white shadow-md disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-4 text-center text-gray-600">
            Kartička {currentCardIndex + 1} z {selectedTopic.cards.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;