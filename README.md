# demoblaze-automation-solution

- This project is automation testing solution for web application "demoblaze" applying WebdriverIO framework.
- Run on Nodejs environment.
- Major packages: WebdriverIO, selenium, supertest, allure-report...

## Directory Structure
This repo is a UI/API automation framework using WebdriverIO (wdio.conf.ts), TypeScript (tsconfig.json), and probably Allure for reporting and .gitlab-ci.yml for CI.

- tests/web/
  - actions/ : Contains High-level user behavior actions combining page objects and controls  
  - controls/ : Contains reusable low-level UI components wrapping
  - pageObjects/ : Page Object Model for each page, defining elements and simple page-level operations (no including assertions)

- tests/api/
requests/: Contains specific API methods for requests to product endpoints. Purpose is to creat/modify/delete data for testing
materials/: Contains static constants used by API requests
payloads/: Contains body templates for API POST requests

- tests/helpers/ : Contains reusable utilities, not tied to UI or API

- tests/specs: Contains UI automation test script files

- tests/data: Contains separated test data for separated logic

Following guideline is only for macOS.

## Get Started

##### - Install nvm:

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
```

You’ll find something added into .bash_profile, if you use zsh, add below line to ~/.zshrc
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

##### - Install node version and make it as default
```bash
nvm install v20.20.0
nvm use v20.20.0
nvm alias default v20.20.0
```

##### - Install dependencies:
```bash
npm install
```

You should be inside repo directory.
It will install dependencies only for this repository.

Open shell config file
```bash
vi ~/.zshrc
```

Add below lines into the shell config file
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

#### Run tests
```
npm run test // default run all tests on "chrome" with "1" instance
```
or
```
BROWSER=["chrome"|"safari"] INSTANCES=[1|2|3|...] npm run test -- -- mochaOpts.grep "Ordering" // run all gittests of suite "Ordering" on given browser type with number of given instances 
```
