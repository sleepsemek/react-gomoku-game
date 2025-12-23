import type {Stone, StoneType} from "../types/Stone.ts";
import type {Coordinate} from "../types/Coordinate.ts";
import type {SerializedMap} from "./SerializedMap.ts";

export const checkWinner = (board: SerializedMap<Coordinate, Stone>, lastStone: Stone): StoneType | undefined => {
    const directions = [
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 },
    ]

    const { coordinate, type } = lastStone

    for (const { dx, dy } of directions) {
        let count = 1
        for (let step = 1; step < 5; step++) {
            const keyCoordinate = {
                x: coordinate.x + dx * step,
                y: coordinate.y + dy * step
            }
            if (board.get(keyCoordinate)?.type === type) count++
            else break
        }
        for (let step = 1; step < 5; step++) {
            const keyCoordinate = {
                x: coordinate.x - dx * step,
                y: coordinate.y - dy * step
            }

            if (board.get(keyCoordinate)?.type === type) count++
            else break
        }
        if (count >= 5) return type
    }
}