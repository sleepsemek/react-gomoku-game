import type {Stone, StoneType} from "./Stone.ts";

export type GameState = {
    board: Map<string, Stone>
    currentPlayer: StoneType
    history: Stone[]
    hasStarted: boolean
    winner?: StoneType,
}