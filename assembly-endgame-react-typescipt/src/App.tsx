import { useState } from "react";
import ReactConfetti from "react-confetti";
import Header from "./components/Header";
import GameStatus from "./components/GameStatus";
import LanguageChips from "./components/LanguagesChips";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";
import NewGameButton from "./components/NewGameButton";
import AriaLiveSection from "./components/AriaLiveSection";
import { languages } from "./assets/languages";
import { getWord } from "./utils/utils";

export default function App() {
  // State values
  const [currentWord, setCurrentWord] = useState<string>((): string => getWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  // Derived values
  const wrongGuessCount: number = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;

  const isGameLost: boolean = wrongGuessCount >= languages.length - 1;
  const isGameWon: boolean = Array.from(currentWord).every((letter) =>
    guessedLetters.includes(letter),
  );
  const isGameOver: boolean = isGameLost || isGameWon;
  const recentLetter: string = guessedLetters[guessedLetters.length - 1];
  const isRecentLetterCorrect: boolean = currentWord.includes(recentLetter);

  // Functions
  function addGuessedLetter(letter: string): void {
    setGuessedLetters((prevArray) => {
      return prevArray.includes(letter) ? prevArray : [...prevArray, letter];
    });
  }

  function startNewGame(): void {
    setCurrentWord(getWord());
    setGuessedLetters([]);
  }

  return (
    <main>
      {isGameWon && <ReactConfetti recycle={false} numberOfPieces={1000} />}

      <Header />

      <GameStatus
        wrongGuessCount={wrongGuessCount}
        languages={languages}
        isGameOver={isGameOver}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        isRecentLetterCorrect={isRecentLetterCorrect}
      />

      <LanguageChips
        wrongGuessCount={wrongGuessCount}
        languages={languages}
      />

      <Word
        currentWord={currentWord}
        isGameLost={isGameLost}
        guessedLetters={guessedLetters}
      />

      <AriaLiveSection
        isRecentLetterCorrect={isRecentLetterCorrect}
        recentLetter={recentLetter}
        languages={languages}
        wrongGuessCount={wrongGuessCount}
        currentWord={currentWord}
        guessedLetters={guessedLetters}
      />

      <Keyboard
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        addGuessedLetter={addGuessedLetter}
        isGameOver={isGameOver}
      />

      <NewGameButton
        isGameOver={isGameOver}
        startNewGame={startNewGame}
      />

    </main>
  );
}
