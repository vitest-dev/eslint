import { describe, it } from 'vitest'
import rule, { RULE_NAME } from '../src/rules/prefer-strict-equal'
import { ruleTester } from './ruleTester'

describe(RULE_NAME, () => {
	it(RULE_NAME, () => {
		ruleTester.run(RULE_NAME, rule, {
			valid: [
				'expect(something).toStrictEqual(somethingElse);',
				'a().toEqual(\'b\')',
				'expect(a);'
			],
			invalid: [
				{
					code: 'expect(something).toEqual(somethingElse);',
					errors: [
						{
							messageId: 'useToStrictEqual',
							column: 19,
							line: 1,
							suggestions: [
								{
									messageId: 'suggestReplaceWithStrictEqual',
									output: 'expect(something).toStrictEqual(somethingElse);'
								}
							]
						}
					]
				},
				{
					code: 'expect(something).toEqual(somethingElse,);',
					parserOptions: { ecmaVersion: 2017 },
					errors: [
						{
							messageId: 'useToStrictEqual',
							column: 19,
							line: 1,
							suggestions: [
								{
									messageId: 'suggestReplaceWithStrictEqual',
									output: 'expect(something).toStrictEqual(somethingElse,);'
								}
							]
						}
					]
				},
				{
					code: 'expect(something)["toEqual"](somethingElse);',
					errors: [
						{
							messageId: 'useToStrictEqual',
							column: 19,
							line: 1,
							suggestions: [
								{
									messageId: 'suggestReplaceWithStrictEqual',
									output: 'expect(something)[\'toStrictEqual\'](somethingElse);'
								}
							]
						}
					]
				}
			]
		})
	})
})
