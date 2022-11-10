import lowerCaseTitle, { RULE_NAME as lowerCaseTitleName } from "./rules/lower-case-title";
import maxNestedDescribe, { RULE_NAME as maxNestedDescribeName } from "./rules/max-nested-describe";
import noIdenticalTitle, { RULE_NAME as noIdenticalTitleName } from "./rules/no-identical-title";
import noSkippedTests, { RULE_NAME as noSkippedTestsName } from "./rules/no-skipped-tests";
import noFocusedTests, { RULE_NAME as noFocusedTestsName } from "./rules/no-focused-tests";

export default {
	rules: {
		[noSkippedTestsName]: noSkippedTests,
		[lowerCaseTitleName]: lowerCaseTitle,
		[maxNestedDescribeName]: maxNestedDescribe,
		[noIdenticalTitleName]: noIdenticalTitle,
		[noFocusedTestsName]: noFocusedTests,
	},
};
