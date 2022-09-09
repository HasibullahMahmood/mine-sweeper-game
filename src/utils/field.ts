import { incrementNeighbors } from './cellEditor'

export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type Field = Cell[][]
export type Coords = [number, number]

export const CellState = {
	empty: 0,
	bomb: 9,
	hidden: 10,
	mark: 11,
	weakMark: 12,
} as const

export const generateEmptyField = (size: number, state: Cell = CellState.empty): Field =>
	Array(size)
		.fill(null)
		.map((_) => Array(size).fill(state))

export const generateField = (size: number, likelihood: number) => {
	if (likelihood > 1 || likelihood < 0) {
		throw new Error('The likelihood must be between 0 and 1!')
	}
	let result = generateEmptyField(size)
	let unprocessedCells = size * size
	let restCellsWithBombs = unprocessedCells * likelihood
	if (restCellsWithBombs === 0) {
		return result
	} else if (restCellsWithBombs === 1) {
		return generateEmptyField(size, CellState.bomb)
	}

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			if (restCellsWithBombs / unprocessedCells > Math.random()) {
				result[i][j] = CellState.bomb
				result = incrementNeighbors([i, j], result)
				restCellsWithBombs--
			}
			unprocessedCells--
		}
	}
	return result
}
