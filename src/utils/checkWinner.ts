import type {Stone, StoneType} from "../types/Stone.ts";

export const checkWinner = (board: Map<string, Stone>, lastStone: Stone): StoneType | undefined => {
    const directions = [
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
    ]

    for (const { dx, dy } of directions) {
        let count = 1
        for (let step = 1; step < 5; step++) {
            const key = `${lastStone.x + dx * step},${lastStone.y + dy * step}`
            if (board.get(key)?.type === lastStone.type) count++
            else break
        }
        for (let step = 1; step < 5; step++) {
            const key = `${lastStone.x - dx * step},${lastStone.y - dy * step}`
            if (board.get(key)?.type === lastStone.type) count++
            else break
        }
        if (count >= 5) return lastStone.type
    }
}