export default function NewGameButton(props) {
    if (!props.isGameOver) {
        return null
    } else {
        return <button onClick={props.startNewGame} className="new-game" > New Game</button >
    }
}