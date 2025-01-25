import { useState, useEffect } from "react";
import Card from "../components/Card";

export default function Game({ mode, onGameEnd }) {
    const [cards, setCards] = useState([]);
    const [selected, setSelected] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const initializeGame = () => {
        let shuffled = [];
        for (let i = 0; i < mode / 2; i++) {
            shuffled.push(i, i); // Each card appears twice
        }
        shuffled = shuffled.sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setMatched([]);
        setSelected([]);
        setMoves(0);
        setStartTime(Date.now());
        setGameOver(false);
    };

    useEffect(() => {
        initializeGame();
    }, [mode]);

    const handleCardClick = (index) => {
        if (selected.length === 2 || matched.includes(index)) return;

        const newSelection = [...selected, index];
        setSelected(newSelection);

        if (newSelection.length === 2) {
            setMoves((prev) => prev + 1);

            const [first, second] = newSelection;
            if (cards[first] === cards[second]) {
                setMatched((prev) => [...prev, first, second]);
            }

            setTimeout(() => setSelected([]), 1000);
        }
    };

    useEffect(() => {
        if (matched.length === mode) {
            const timeElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            const newHistory = [
                ...(JSON.parse(localStorage.getItem("history")) || []),
                { score: mode / 2, time: timeElapsed, moves },
            ];
            localStorage.setItem("history", JSON.stringify(newHistory));
            onGameEnd(newHistory);
            setGameOver(true);
        }
    }, [matched]);

    return (
        <div className="text-center">
            <p className="mt-3 alert alert-primary">Moves: {moves}</p>
            <p className="alert alert-success">Matches: {matched.length / 2} / {mode / 2}</p>

            {gameOver ? (
                <div>
                    <p className="alert alert-info">Game Over! 🎉</p>
                    <button className="btn btn-primary" onClick={initializeGame}>
                        Play Again 🔄
                    </button>
                </div>
            ) : (
                <div className="d-grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.sqrt(mode)}, 1fr)`, maxWidth: "400px", margin: "auto" }}>
                    {cards.map((num, idx) => (
                        <Card
                            key={idx}
                            value={matched.includes(idx) || selected.includes(idx) ? num : "?"}
                            onClick={() => handleCardClick(idx)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
