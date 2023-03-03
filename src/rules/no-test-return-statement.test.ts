import { TSESLint } from '@typescript-eslint/utils'
import { describe, it } from 'vitest'
import rule, { RULE_NAME } from './no-test-return-statement'

const ruleTester = new TSESLint.RuleTester({
	parser: require.resolve('@typescript-eslint/parser')
})

describe(RULE_NAME, () => {
	it(RULE_NAME, () => {
		ruleTester.run(RULE_NAME, rule, {
			valid: [
				'it("noop", function () {});',
				'test("noop", () => {});',
				'test("one", () => expect(1).toBe(1));',
				'test("empty")',
				`it("one", myTest);
				function myTest() {
				  expect(1).toBe(1);
				}`,
				`it("one", myTest);
				function myTest() {
				  expect(1).toBe(1);
				}`,
				`
			      it("one", () => expect(1).toBe(1));
			      function myHelper() {}
			    `
			],
			invalid: [
				{
					code: `test("one", () => {
						return expect(1).toBe(1);
					  });`,
					errors: [
						{
							messageId: 'noTestReturnStatement',
							column: 7,
							line: 2
						}
					]
				},
				{
					code: `it("one", function () {
						return expect(1).toBe(1);
					  });`,
					errors: [
						{
							messageId: 'noTestReturnStatement',
							column: 7,
							line: 2
						}
					]
				},
				{
					code: `it.skip("one", function () {
						return expect(1).toBe(1);
					  });`,
					errors: [
						{
							messageId: 'noTestReturnStatement',
							column: 7,
							line: 2
						}
					]
				},
				{
					code: `it("one", myTest);
					function myTest () {
					  return expect(1).toBe(1);
					}`,
					errors: [
						{
							messageId: 'noTestReturnStatement',
							column: 8,
							line: 3
						}
					]
				}
			]
		})
	})
})
