
const { defineConfig, devices } = require('@playwright/test')

// require('dotenv').config();

/** See https://playwright.dev/docs/test-configuration. */
module.exports = defineConfig({
	/** Where the test files are located */
	testDir: 'dist/tests/e2e',

	/** Folder to place test output artifacts in */
	outputDir: 'temp',

	/** Maximum time one test can run for (in ms) */
	timeout: 30 * 1000,

	expect: {
		/** Maximum time expect() should wait for condition to be met (in ms); eg., in `await expect(locator).toHaveText();` */
		timeout: 5000
	},

	/** Run tests in files in parallel (across and within files) */
	fullyParallel: false,

	/** Numbers of workers for parallelizing the tests, as a percentage of logical cpu cores */
	workers: "50%",

	/** Fail the build on CI if you accidentally enabled focused tests only */
	forbidOnly: !!process.env.CI,

	/** Retry on CI only */
	retries: 0,

	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	// @ts-ignore
	reporter: [
		['github'],
		// ['./node-app/tests/playwright-reporter.ts'],
		['line'], // applied by default
		// ['dot'],
		// ['list'],
		// ['junit', { outputFile: '.test.e2e.xml' }],
		// ['html', { outputFolder: '.test.e2e.html' }],
		// ['json', { outputFile: '.test.e2e.json' }]
	],

	/** Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/** Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,

		browserName: "firefox",

		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://localhost:3000',

		/** Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
		video: 'retain-on-failure',
		screenshot: 'only-on-failure'
	},

	/** Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
			testMatch: '*.ui.test.js'
		},
		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
			},
			testMatch: '*.ui.test.js'
		},

		// {
		// 	name: 'webkit',
		// 	use: { ...devices['Desktop Safari'] },
		// },

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { channel: 'chrome' },
		// },
	],

	/** Run your local dev server before starting the tests */
	webServer: {
		command: 'pnpm run start',
		port: parseInt(process.env.PORT ?? '49745'),
		reuseExistingServer: true
	},
})
