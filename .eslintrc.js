module.exports = {
	"root": true,
	"parser": "@typescript-eslint/parser",
	"parserOptions": { project: ['./tsconfig.json', './test/tsconfig.json'] },
	"plugins": ["@typescript-eslint", "sonarjs", "jsdoc", "react"],
	"env": { "browser": true, "node": true },
	"extends": [
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:jsdoc/recommended"
	],
	"rules": {
		/* logic */
		"array-callback-return": "error",
		"no-self-compare": "error",
		"no-self-assign": "error",
		"no-duplicate-case": "error",
		"no-func-assign": "error",
		"no-dupe-else-if": "error",
		"no-loss-of-precision": "error",
		"no-constructor-return": "error",
		"no-async-promise-executor": "error",
		"for-direction": "error",
		"no-unreachable": "error",

		"sonarjs/no-all-duplicated-branches": "error", //All branches in a conditional structure should not have exactly the same implementation
		"sonarjs/no-element-overwrite": "error", // Collection elements should not be replaced unconditionally
		"sonarjs/no-empty-collection": "error", // Empty collections should not be accessed or iterated
		"sonarjs/no-extra-arguments": "error", // Function calls should not pass extra arguments
		"sonarjs/no-identical-conditions": "error", // Related "if/else if" statements should not have the same condition
		"sonarjs/no-identical-expressions": "error", // Identical expressions used on both sides of a binary operator
		"sonarjs/no-collection-size-mischeck": "error", // Testing array/collection size/length is greater than or equal to zero doesn't make sense
		"sonarjs/no-ignored-return": "warn", // Return values from functions without side effects should not be ignored
		"sonarjs/no-one-iteration-loop": "error", // Loops with at most one iteration should be refactored
		"sonarjs/no-use-of-empty-return-value": "error", // The output of functions that don't return anything should not be used
		"sonarjs/non-existent-operator": "error", // Non-existent operators '=+', '=-' and '=!' should not be used

		/* style */
		"init-declarations": ["error", "always"],
		"sonarjs/prefer-object-literal": "error", // initialize object's properties in its declaration vs setting them one-by-one.
		"prefer-const": "error",
		"no-var": "error",
		"no-param-reassign": "error",
		"no-unused-expressions": "error",
		"sonarjs/no-unused-collection": "error", // Collection is populated but its contents never used
		"eqeqeq": "error", // Use of type-unsafe equality operators such as == and != 
		"@typescript-eslint/strict-boolean-expressions": "warn", // truthy/falsy boolean expressions
		"no-mixed-operators": "error", // Use of different operators consecutively without parentheses in an expression
		"no-cond-assign": "error", // Ambiguous assignment operators in test conditions of if, for, while, and do...while statements
		"no-labels": "error", // Use of labeled statements
		"no-unused-labels": "error",
		"no-unexpected-multiline": "error", // confusing multiline expressions where a newline looks like it is ending a statement, but is not
		"no-shadow-restricted-names": "error",
		"@typescript-eslint/no-namespace": ["off"],
		"@typescript-eslint/no-shadow": ["error", { "ignoreTypeValueShadow": true }],
		"arrow-parens": ["error", "as-needed"],
		"prefer-template": "error",
		"no-template-curly-in-string": "error",
		"no-unsafe-negation": "error",
		"no-import-assign": "error",
		"no-global-assign": "error", // modifications to read-only global variables
		"no-new-wrappers": "error",
		"@typescript-eslint/no-empty-interface": "warn",
		"no-empty": "error", // empty block statements
		"max-params": ["warn", 4], // max functions parameters count
		"@typescript-eslint/no-inferrable-types": "error",
		"@typescript-eslint/prefer-as-const": "error",
		"@typescript-eslint/ban-ts-comment": "error",
		"@typescript-eslint/ban-types": "warn",
		"@typescript-eslint/no-unnecessary-condition": ["warn", { "allowConstantLoopConditions": true }],
		"no-return-await": "error",
		"guard-for-in": "error", // using a for-in loop without filtering the results in the loop
		"semi": ["error", "never"],

		"sonarjs/prefer-single-boolean-return": "error", // Prefer `return expr` to `if (expr) {return true} else {return false}`
		"sonarjs/no-collapsible-if": "error", // Collapsible "if" statements should be merged
		"sonarjs/no-identical-functions": "error", // Functions with identical implementations
		"sonarjs/no-duplicate-string": ["warn", 7], // String literals that are duplicated
		"sonarjs/no-duplicated-branches": "error", // Two branches in a conditional structure with exactly the same implementation
		"sonarjs/no-redundant-jump": "error", // Redundant jump (return, break, continue) statements e.g., (x) => { if (x) { console.log("hi"); return; }}
		"sonarjs/no-redundant-boolean": "error",
		"sonarjs/no-useless-catch": "error", // "catch" clauses should do more than rethrow

		"camelcase": ["warn", { "properties": "always", "ignoreImports": true }],
		"no-await-in-loop": "warn",
		"require-atomic-updates": "warn",
		"no-invalid-this": "warn",

		"no-shadow": "off",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-var-requires": "off", // require statements in import statements.
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-empty-function": "off",
		"no-undef-init": "off",

		/* formatting */
		"curly": ["error", "multi-line"], // ensuring that block statements are wrapped in curly braces
		"brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
		"space-in-parens": ["error", "never"],
		"block-spacing": ["error", "always"],
		"arrow-body-style": ["error", "as-needed"], // use of braces around arrow function body
		"indent": ["warn", "tab", { "SwitchCase": 1 }],
		"no-irregular-whitespace": "warn", // invalid whitespace that is not a normal tab and space

		/* comments */
		"jsdoc/require-jsdoc": ["off", {
			"require": {
				"FunctionDeclaration": true,
				"MethodDefinition": true,
				"ArrowFunctionExpression": false,
				"FunctionExpression": false,
			},
			"contexts": [
				// "ExportNamedDeclaration",
				"TSInterfaceDeclaration",
				// "TSTypeAliasDeclaration",
				{ "context": ":not(TSTypeLiteral) > TSPropertySignature" },
				"PropertyDefinition"
			],
			"exemptEmptyConstructors": true
		}],
		"jsdoc/require-param": "off",
		"jsdoc/check-param-names": "off",
		"jsdoc/require-param-description": "error",
		"jsdoc/require-param-type": "off",
		"jsdoc/multiline-blocks": ["error", { "noZeroLineText": false }],
		"jsdoc/newline-after-description": "off",
		"jsdoc/require-returns": "warn",
		"jsdoc/require-returns-type": "off",

		"no-warning-comments": ["warn", { "terms": ["todo"], "location": "anywhere" }],

		/* jsx */
		"react/jsx-first-prop-new-line": "error",
		"react/react-in-jsx-scope": "off",
		"react/jsx-key": "off",
		"react/no-unknown-property": "warn",
		"react/prop-types": "off",
		"react/display-name": "off",

	},
	"settings": {
		"jsdoc": {}
	},
	"noInlineConfig": true
}

