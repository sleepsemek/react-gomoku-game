import style from './App.module.scss'
import Board from "./components/Board.tsx"
import {useState} from "react"
import type {Stone, StoneType} from "./types/Stone.ts"
import type {GameState} from "./types/GameState.ts"
import clsx from "clsx"
import {checkWinner} from "./utils/checkWinner.ts";

function App() {
    const initialState: GameState = {
        board: new Map<string, Stone>(),
        currentPlayer: 'black',
        history: [],
        hasStarted: false,
        winner: undefined,
    }

    const [game, setGame] = useState<GameState>(initialState)
    const [showStartModal, setShowStartModal] = useState(true)
    const [showEndModal, setShowEndModal] = useState(false)

    const handleCellClick = (x: number, y: number) => {
        if (!game.hasStarted || game.winner) return

        const key = `${x},${y}`
        if (game.board.has(key)) return

        setGame(prev => {
            const newStone: Stone = { x, y, type: prev.currentPlayer }
            const newBoard = new Map(prev.board).set(`${x},${y}`, newStone)
            const winner = checkWinner(newBoard, newStone)

            if (winner) setShowEndModal(true)

            return {
                ...prev,
                board: newBoard,
                currentPlayer: nextPlayer(prev.currentPlayer),
                winner,
                history: [...prev.history, newStone]
            }
        })
    }

    const nextPlayer = (player: StoneType): StoneType => player === 'black' ? 'white' : 'black'

    const resetGame = () => {
        setGame(initialState)
        setShowStartModal(true)
        setShowEndModal(false)
    }

    const undoMove = () => {
        setGame(prev => {
            if (prev.history.length === 0) return prev
            const newHistory = prev.history.slice(0, -1)
            const lastStone = prev.history[prev.history.length - 1]

            const newBoard = new Map(prev.board)
            newBoard.delete(`${lastStone.x},${lastStone.y}`)

            return {
                ...prev,
                board: newBoard,
                history: newHistory,
                currentPlayer: nextPlayer(prev.currentPlayer),
                winner: undefined
            }
        })
    }

    const startGame = () => {
        setShowStartModal(false)
        setGame(prev => ({ ...prev, hasStarted: true }))
    }

    return (
        <div className={style.container}>
            <main className={style.main}>
                <Board
                    stones={game.board}
                    onCellClick={handleCellClick}
                />
            </main>

            <aside className={style.sidebar}>
                <h1 className={style.title}>Гомоку</h1>

                <div className={style.card}>
                    <div className={style.section}>
                        <h2>Текущий ход:</h2>
                        <div className={style.turn}>
                            <span className={clsx(style.stone, style[game.currentPlayer])}></span>
                            <div>{game.currentPlayer === 'black' ? 'Черные' : 'Белые'}</div>
                        </div>
                    </div>
                </div>

                <div className={style.card}>
                    <div className={style.section}>
                        <h2>Управление</h2>
                        <div className={style.controls}>
                            <button className={style.primaryButton} onClick={resetGame}>Новая игра</button>
                            <button
                                className={style.button}
                                onClick={undoMove}
                                disabled={!game.hasStarted || game.history.length === 0 || !!game.winner}
                            >
                                Отменить ход
                            </button>
                        </div>
                    </div>
                </div>

                {game.history.length > 0 && (
                    <div className={style.card}>
                        <div className={style.section}>
                            <h2>Последние ходы</h2>
                            <ul className={style.historyList}>
                                {game.history.slice(-10).map((stone, index, arr) => {
                                    const actualIndex = game.history.length - arr.length + index;
                                    return (
                                        <li key={actualIndex} className={style.historyItem}>
                                            {actualIndex + 1}
                                            <span className={clsx(style.stone, style[stone.type])}></span>
                                            {String.fromCharCode(stone.x + 97)}, {Math.abs(stone.y - 15)}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                )}

            </aside>

            {showStartModal && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <h2>Начало игры</h2>
                        <p>Цель игры: выставить пять шашек одного цвета в ряд по горизонтали, вертикали или по диагонали. В случае, если доска заполняется полностью, происходит ничья.</p>
                        <button className={style.primaryButton} onClick={startGame}>Начать игру</button>
                    </div>
                </div>
            )}

            {showEndModal && game.winner && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <h2>Конец игры!</h2>
                        <p>Победили {game.winner === 'black' ? 'Черные' : 'Белые'}</p>
                        <button className={style.primaryButton} onClick={resetGame}>Новая игра</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
