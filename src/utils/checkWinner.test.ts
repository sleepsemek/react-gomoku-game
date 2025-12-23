import type {Stone} from "../types/Stone.ts";
import {describe, it, expect} from "vitest";
import {checkWinner} from "./checkWinner.ts";

const createBoard = (stones: Stone[]) => {
    const board = new Map<string, Stone>()
    for (const stone of stones) {
        board.set(`${stone.x},${stone.y}`, stone)
    }
    return board
}

describe('checkWinner', () => {
    it('should check for victory horizontally', () => {
        const stones: Stone[] = [
            { x: 3, y: 7, type: 'black' },
            { x: 4, y: 7, type: 'black' },
            { x: 5, y: 7, type: 'black' },
            { x: 6, y: 7, type: 'black' },
            { x: 7, y: 7, type: 'black' },
        ]

        const board = createBoard(stones)
        const lastStone = stones[4]

        const result = checkWinner(board, lastStone)

        expect(result).toBe('black')
    })

    it('should check for victory vertically', () => {
        const stones: Stone[] = [
            { x: 10, y: 3, type: 'white' },
            { x: 10, y: 4, type: 'white' },
            { x: 10, y: 5, type: 'white' },
            { x: 10, y: 6, type: 'white' },
            { x: 10, y: 7, type: 'white' },
        ]

        const board = createBoard(stones)
        const lastStone = stones[4]

        const result = checkWinner(board, lastStone)

        expect(result).toBe('white')
    })

    it('should check for victory at main diagonal', () => {
        const stones: Stone[] = [
            { x: 2, y: 2, type: 'black' },
            { x: 3, y: 3, type: 'black' },
            { x: 4, y: 4, type: 'black' },
            { x: 5, y: 5, type: 'black' },
            { x: 6, y: 6, type: 'black' },
        ]

        const board = createBoard(stones)
        const lastStone = stones[4]

        const result = checkWinner(board, lastStone)

        expect(result).toBe('black')
    })

    it('should not check for victory if there is less than 5 stones', () => {
        const stones: Stone[] = [
            { x: 1, y: 1, type: 'white' },
            { x: 2, y: 1, type: 'white' },
            { x: 3, y: 1, type: 'white' },
            { x: 4, y: 1, type: 'white' },
        ]

        const board = createBoard(stones)
        const lastStone = stones[3]

        const result = checkWinner(board, lastStone)

        expect(result).toBeUndefined()
    })

    it('should not check for victory if the stone sequence is broken', () => {
        const stones: Stone[] = [
            { x: 5, y: 10, type: 'black' },
            { x: 6, y: 10, type: 'black' },
            { x: 7, y: 10, type: 'white' },
            { x: 8, y: 10, type: 'black' },
            { x: 9, y: 10, type: 'black' },
            { x: 10, y: 10, type: 'black' },
        ]

        const board = createBoard(stones)
        const lastStone = stones[5]

        const result = checkWinner(board, lastStone)

        expect(result).toBeUndefined()
    })

    it('should return undefined when there is no winning line (covering else break paths)', () => {
        const stones: Stone[] = [
            { x: 7, y: 7, type: 'black' },
            { x: 7, y: 8, type: 'black' },
            { x: 8, y: 7, type: 'black' },
            { x: 7, y: 6, type: 'white' },
            { x: 6, y: 7, type: 'white' },
            { x: 6, y: 6, type: 'white' },
            { x: 8, y: 8, type: 'white' },
        ];

        const board = createBoard(stones);
        const lastStone = stones[0];

        const result = checkWinner(board, lastStone);

        expect(result).toBeUndefined();
    });
})