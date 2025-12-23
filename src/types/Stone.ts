import type {Coordinate} from "./Coordinate.ts";

export type Stone = {
    coordinate: Coordinate
    type: StoneType
}

export type StoneType = 'black' | 'white'