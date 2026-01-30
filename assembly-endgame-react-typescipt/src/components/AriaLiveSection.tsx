export default function AriaLiveSection(props) {
    return (
        //  Combined visually-hidden aria-live region for status updates 
        <section className="sr-only" aria-live="polite" role="status">
            <p>
                {props.isRecentLetterCorrect
                    ? `Correct! The letter ${props.recentLetter} is in the word.`
                    : `Sorry, the letter ${props.recentLetter} is not in the word.`}
                You have {props.languages.length - 1 - props.wrongGuessCount} attempts left.
            </p>
            <p>
                Current word:
                {props.currentWord
                    .split("")
                    .map((letter) =>
                        props.guessedLetters.includes(letter) ? letter + "." : "blank.",
                    )
                    .join(" ")}
            </p>
        </section>
    )
}