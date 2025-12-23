import type {Stone, StoneType} from "./Stone.ts";
import type {Coordinate} from "./Coordinate.ts";
import type {SerializedMap} from "../utils/SerializedMap.ts";

export type GameState = {
    board: SerializedMap<Coordinate, Stone>
    currentPlayer: StoneType
    history: Stone[]
    hasStarted: boolean
    winner?: StoneType
}