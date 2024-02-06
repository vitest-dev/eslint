import { expect, it, describe } from 'vitest'

describe('conditionals', () => {
	it('should run only if condition is true', () => {
		expect(true).toBeTruthy()
	})

	it('should error one errors only', () => {
		if (true) {
			function foo() {
				console.log('foo')
			}
			foo()
		}

		expect(true).toBeTruthy()
	})
})
