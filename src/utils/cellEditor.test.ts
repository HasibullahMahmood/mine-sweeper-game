import { incrementNeighbors, getNeighborsCoords, checkItemValidInField } from './cellEditor'
import { CellState } from './field'

const { bomb, empty } = CellState

describe('Check incrementNeighbors function', () => {
	describe('Check getNeighborsCoords', () => {
		it('getNeighborsCoords with [0, 0]', () => {
			expect(getNeighborsCoords([0, 0])).toStrictEqual({
				topLeft: [-1, 1],
				top: [0, 1],
				topRight: [1, 1],
				left: [-1, 0],
				right: [1, 0],
				bottomRight: [1, -1],
				bottom: [0, -1],
				bottomLeft: [-1, -1],
			})
		})

		it('getNeighborsCoords with [5, 5]', () => {
			expect(getNeighborsCoords([5, 5])).toStrictEqual({
				topLeft: [4, 6],
				top: [5, 6],
				topRight: [6, 6],
				left: [4, 5],
				right: [6, 5],
				bottomRight: [6, 4],
				bottom: [5, 4],
				bottomLeft: [4, 4],
			})
		})
	})

	describe('Check checkItemValidInField', () => {
		it('checkItemValidInField simple one', () => {
			expect(checkItemValidInField([0, 0], [[bomb]])).toBe(false)
		})

		it('checkItemValidInField y out of range', () => {
			expect(checkItemValidInField([0, -1], [[bomb]])).toBe(false)
		})

		it('checkItemValidInField truthy', () => {
			expect(checkItemValidInField([0, 0], [[empty]])).toBe(true)
		})

		it('checkItemValidInField x and y out of range', () => {
			expect(checkItemValidInField([-1, -1], [[empty]])).toBe(false)
		})
	})

	it('1x1 field incrementNeighbor', () => {
		const result = incrementNeighbors([0, 0], [[bomb]])
		expect(result).toStrictEqual([[bomb]])
	})

	it('2x2 field incrementNeighbor', () => {
		const result = incrementNeighbors(
			[0, 0],
			[
				[bomb, empty],
				[empty, empty],
			]
		)
		expect(result).toStrictEqual([
			[bomb, 1],
			[1, 1],
		])
	})

	it('3x3 field incrementNeighbor', () => {
		const result = incrementNeighbors(
			[0, 0],
			[
				[bomb, 1, bomb],
				[empty, 1, 1],
				[empty, empty, empty],
			]
		)
		expect(result).toStrictEqual([
			[bomb, 2, bomb],
			[1, 2, 1],
			[empty, empty, empty],
		])
	})
})
