import dotenv from "dotenv"
dotenv.config();
import allure from 'allure-commandline';
import type { Options } from "@wdio/types"
import {join} from "path";
export const config: Options.Testrunner = {
    runner: "local",
    tsConfigPath: "./tsconfig.json",
    outputDir: join(process.cwd(), 'tests/data/output/'),
    specs: [`${process.cwd()}/tests/specs/**/*.spec.ts`],
    exclude: [
        // 'path/to/excluded/files'
    ],
    capabilities: process.env.BROWSER === 'chrome' ? [
        {
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'wdio:enforceWebDriverClassic': true,
        'goog:chromeOptions': {
            prefs: {
                'download.prompt_for_download': false,
                'profile.managed_default_content_settings.popups': 2,
                'profile.default_content_setting_values.automatic_downloads': 1
            }
            // args: ['--headless=new', '--window-size=1920,1200']
        }
    }] : [            {
            browserName: 'safari',
           acceptInsecureCerts: true,
         }],
    maxInstances: parseInt(process.env.INSTANCES),
    logLevel: 'debug',
    bail: 0,
    waitforTimeout: parseInt(process.env.WAIT_FOR_TIMEOUT),
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [],
    framework: 'mocha',
    mochaOpts: {
        timeout: 3600000,
        diff: true,
        fullTrace: true,
        bail: 0,
        allowUncaught: true,
        isWorker: true
    },
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
                addConsoleLogs: true
            }
        ]
    ],
    onPrepare: function () {
    },
    before: function () {
    },
    beforeScenario: function () {
    },
    beforeStep: function () {
    },
    afterStep: async function ({ passed }) {
        if (!passed) {
            await browser.takeScreenshot()
        }
    },
    afterScenario: function () {
    },
    afterFeature: function () {
         },

    afterTest: async function () {
        await browser.reloadSession();
    },

    onComplete: async function() {
        const reportError = new Error('Unable to generate Allure reports')
        const generation = allure(['generate', 'allure-results', '--clean', '--single-file'])
        await new Promise<void>((resolve, reject) => {
            const generationTimeout = setTimeout(() => reject(reportError), 5000)
            generation.on('exit', function (exitCode: any) {
                clearTimeout(generationTimeout);
                if (exitCode !== 0) {
                    return reject(reportError);
                }
                console.log('Allure reports successfully generated');
                resolve()
            });
        });
    },
};
