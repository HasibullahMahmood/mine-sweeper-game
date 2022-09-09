import { generateField, generateEmptyField, CellState } from './field'

const { empty, bomb, hidden } = CellState

describe('Check field functions', () => {
	describe('Check generateEmptyField', () => {
		it('2x2', () => {
			expect(generateEmptyField(2)).toStrictEqual([
				[empty, empty],
				[empty, empty],
			])
		})

		it('3x3 with bomb', () => {
			expect(generateEmptyField(3, bomb)).toStrictEqual([
				[bomb, bomb, bomb],
				[bomb, bomb, bomb],
				[bomb, bomb, bomb],
			])
		})
	})

	describe('Check generateField', () => {
		it('Likelihood must be between 0 and 1', () => {
			expect(() => generateField(1, -1)).toThrow('The likelihood must be between 0 and 1!')
		})

		it('Field with Likelihood of 0 must be all empty', () => {
			expect(generateField(1, 0)).toStrictEqual([[empty]])
			expect(generateField(2, 0)).toStrictEqual([
				[empty, empty],
				[empty, empty],
			])
		})

		it('Field with likelihood of 1 must all be bomb', () => {
			expect(generateField(1, 1)).toStrictEqual([[bomb]])
		})

		it('2x2 Field with likelihood of 50%', () => {
			const field = generateField(2, 0.5)
			const flatField = field.flat()
			const emptyCells = flatField.filter((cell) => cell === 2)
			const bombCells = flatField.filter((cell) => cell === bomb)
			expect(emptyCells).toHaveLength(2)
			expect(bombCells).toHaveLength(2)
		})
	})
})
