export default function Word(props) {
    const wordDisplay = props.currentWord.split("").map((letter: string, index: number) => {
        return !props.isGameLost ? (
            <div key={index} className={"alphabet"}>
                {props.guessedLetters.includes(letter) ? letter : ""}
            </div>
        ) : (
            <div
                key={index}
                className={`alphabet ${!props.guessedLetters.includes(letter) && "lost"}`}
            >
                {letter}
            </div>
        );
    });
    return (
        <section className="word">{wordDisplay}</section>

    )
} 