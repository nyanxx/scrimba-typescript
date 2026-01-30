import Chip from "./Chip";

export default function LanguageChips(props) {
    const languageElements = props.languages.map((obj, index: number) => {
        return (
            <Chip
                key={obj.name}
                obj={obj}
                lost={index < props.wrongGuessCount}
            />
        );
    });
    return (
        <section className="language-chips">{languageElements}</section>

    )
}