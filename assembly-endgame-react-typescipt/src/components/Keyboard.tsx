import Alphabet from "./Alphabet";

export default function Keyboard(props) {
    const alphabets = Array.from({ length: 26 })
        .map((_, i) => String.fromCharCode(65 + i))
        .map((letter) => {
            const isGuessed: boolean = props.guessedLetters.includes(letter);
            const isCorrect: boolean = isGuessed && props.currentWord.includes(letter);
            const isWrong: boolean = isGuessed && !props.currentWord.includes(letter);

            return (
                <Alphabet
                    key={letter}
                    alphabet={letter}
                    isGuessed={isGuessed}
                    isCorrect={isCorrect}
                    isWrong={isWrong}
                    isGameOver={props.isGameOver}
                    addGuessedLetter={props.addGuessedLetter}
                />
            );
        });

    return (
        <section className={`keyboard`}>
            {alphabets}
        </section>)
}