import { Coords, Field, Cell } from './field'

export const incrementNeighbors = (coord: Coords, field: Field): Field => {
	const coords = getNeighborsCoords(coord)
	Object.values(coords).forEach((c) => {
		if (checkItemValidInField(c, field)) {
			const cell = field[c[0]][c[1]]
			field[c[0]][c[1]] = (cell + 1) as Cell
		}
	})
	return field
}

export const getNeighborsCoords = ([x, y]: Coords): Record<string, Coords> => ({
	topLeft: [x - 1, y + 1],
	top: [x, y + 1],
	topRight: [x + 1, y + 1],
	left: [x - 1, y],
	right: [x + 1, y],
	bottomRight: [x + 1, y - 1],
	bottom: [x, y - 1],
	bottomLeft: [x - 1, y - 1],
})

export const checkItemValidInField = ([x, y]: Coords, field: Field) => {
	let val = field[x] && field[x][y]
	return val !== undefined && val !== 9
}
