import { CellState } from '@/types/field-types'
import { generateFields } from './field'

const { empty, bomb, hidden } = CellState

describe('Check field functions', () => {
	describe('Check generateFields', () => {
		it('2x2', () => {
			expect(generateFields(2)).toStrictEqual([
				[empty, empty],
				[empty, empty],
			])
		})

		it('3x3 with bomb', () => {
			expect(generateFields(3, bomb)).toStrictEqual([
				[bomb, bomb, bomb],
				[bomb, bomb, bomb],
				[bomb, bomb, bomb],
			])
		})
	})
})
