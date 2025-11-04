import type {Stone} from "../types/Stone.ts"
import style from "./Board.module.scss"
import clsx from "clsx";
import {useEffect, useRef, useState} from "react";

const BOARD_SIZE = 15

type BoardProps = {
    stones: Map<string, Stone>,
    onCellClick?: (x: number, y: number) => void,
}

export default function Board({stones, onCellClick}: BoardProps) {
    const initialCursorPosition = {
        x: 7,
        y: 7
    }

    const [cursor, setCursor] = useState(initialCursorPosition)
    const cellsRef = useRef<(HTMLDivElement | null)[]>([])

    const moveCursor = (dx: number, dy: number) => {
        setCursor(prev => {
            const x = Math.max(0, Math.min(BOARD_SIZE - 1, prev.x + dx))
            const y = Math.max(0, Math.min(BOARD_SIZE - 1, prev.y + dy))
            const index = y * BOARD_SIZE + x
            const el = cellsRef.current[index]
            if (el) el.focus()
            return { x, y }
        })
    }

    const handleClick = (x: number, y: number) => {
        onCellClick?.(x, y)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.code) {
                case "ArrowUp":    e.preventDefault(); moveCursor(0, -1); break
                case "ArrowDown":  e.preventDefault(); moveCursor(0, 1); break
                case "ArrowLeft":  e.preventDefault(); moveCursor(-1, 0); break
                case "ArrowRight": e.preventDefault(); moveCursor(1, 0); break
                case "Enter":      e.preventDefault(); onCellClick?.(cursor.x, cursor.y); break
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [cursor, onCellClick])

    return (
        <div className={style.boardWrapper}>
            <div
                className={style.board}
                style={{
                    gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
                    gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
                }}
                role="grid"
                aria-label="Доска Го"
            >
                <div className={clsx(style.boardLegend, style.boardLegendX)}>
                    {Array.from({length: BOARD_SIZE}).map((_, i) => (
                        <span key={i}>{ String.fromCharCode(i + 97) }</span>
                    ))}
                </div>
                <div className={clsx(style.boardLegend, style.boardLegendY)}>
                    {Array.from({length: BOARD_SIZE}).map((_, i) => (
                        <span key={i}>{ i + 1 }</span>
                    ))}
                </div>
                {Array.from({length: BOARD_SIZE * BOARD_SIZE}, (_, i) => {
                    const x = i % BOARD_SIZE
                    const y = Math.floor(i / BOARD_SIZE)
                    const stone = stones.get(`${x},${y}`)
                    const isCursor = cursor.x === x && cursor.y === y

                    return (
                        <div
                            ref={(el) => {cellsRef.current[i] = el}}
                            key={`${x}-${y}`}
                            className={style.cell}
                            onClick={() => handleClick(x, y)}
                            role="gridcell"
                            tabIndex={isCursor ? 0 : -1}
                            aria-selected={isCursor}
                        >
                            {stone && (
                                <div
                                    className={`${style.stone} ${style[stone.type]}`}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
        
    )
}
