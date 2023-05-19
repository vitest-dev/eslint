import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint'
import { describe, it } from 'vitest'
import rule, { RULE_NAME } from './no-commented-out-tests'

describe(RULE_NAME, () => {
	it(RULE_NAME, () => {
		const ruleTester = new RuleTester({
			parser: require.resolve('@typescript-eslint/parser')
		})

		ruleTester.run(RULE_NAME, rule, {
			valid: [
				'// foo("bar", function () {})',
				'describe("foo", function () {})',
				'it("foo", function () {})',
				'describe.only("foo", function () {})',
				'it.only("foo", function () {})',
				'it.concurrent("foo", function () {})',
				'test("foo", function () {})',
				'test.only("foo", function () {})',
				'test.concurrent("foo", function () {})',
				'var appliedSkip = describe.skip; appliedSkip.apply(describe)',
				'var calledSkip = it.skip; calledSkip.call(it)',
				'({ f: function () {} }).f()',
				'(a || b).f()',
				'itHappensToStartWithIt()',
				'testSomething()',
				'// latest(dates)',
				'// TODO: unify with Git implementation from Shipit (?)',
				'#!/usr/bin/env node'
			],
			invalid: [
				{
					code: '// describe(\'foo\', function () {})\'',
					errors: [
						{
							messageId: 'noCommentedOutTests',
							column: 1,
							line: 1,
							suggestions: [
								{ messageId: 'addSkip', output: 'describe.skip(\'foo\', function () {})\'' }
							]
						}
					]
				},
				{
					code: '// test.concurrent("foo", function () {})',
					errors: [
						{
							messageId: 'noCommentedOutTests',
							column: 1,
							line: 1,
							suggestions: [
								{ messageId: 'addSkip', output: 'test.skip.concurrent("foo", function () {})' }
							]
						}
					]
				},
				{
					code: '// test["skip"]("foo", function () {})',
					errors: [
						{
							messageId: 'noCommentedOutTests',
							column: 1,
							line: 1,
							suggestions: [
								{ messageId: 'addSkip', output: 'test.skip["skip"]("foo", function () {})' }
							]
						}
					]
				},
				{
					code: '// xdescribe("foo", function () {})',
					errors: [
						{
							messageId: 'noCommentedOutTests',
							column: 1,
							line: 1,
							suggestions: [
								{ messageId: 'addSkip', output: 'xdescribe.skip("foo", function () {})' }
							]
						}
					]
				},
				{
					code: '// xit("foo", function () {})',
					errors: [
						{
							messageId: 'noCommentedOutTests',
							column: 1,
							line: 1,
							suggestions: [
								{ messageId: 'addSkip', output: 'xit.skip("foo", function () {})' }
							]
						}
					]
				},
				{
					code: '// fit("foo", function () {})',
					errors: [
						{
							messageId: 'noCommentedOutTests',
							column: 1,
							line: 1,
							suggestions: [
								{ messageId: 'addSkip', output: 'fit.skip("foo", function () {})' }
							]
						}
					]
				},
				{
					code: ` // test(
						//   "foo", function () {}
						// )`,
					errors: [
						{
							messageId: 'noCommentedOutTests',
							column: 2,
							line: 1
						}
					]
				}
			]
		})
	})
})
