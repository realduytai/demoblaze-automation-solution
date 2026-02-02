# demoblaze-automation-solution

- This project is automation testing solution for web application "demoblaze" applying WebdriverIO framework.
- Run on Nodejs environment.
- Major packages: WebdriverIO, selenium, supertest, allure-report...

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
npm run test // default run on "chrome" with "1" instance
```
or
```
BROWSER=["chrome"|"safari"] INSTANCES=[1|2|3|...] npm run test // run on given browser type with number of given instances 
```
