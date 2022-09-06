import { add } from './Math'

describe('Math functions', () => {
	it('add function check', () => {
		expect(add(2, 3)).toBe(5)
	})
})
