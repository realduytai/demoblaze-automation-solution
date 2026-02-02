function action(message: string) {
    console.log(`${new Date().toLocaleString()} - [ACTION]       --- ${message}`)
}

function verify(message: string) {
    console.log(
        '\x1b[94m%s\x1b[0m',
        `${new Date().toLocaleString()} - [VERIFY]       --- ${message}`
    )
}

function info(message: string) {
    console.info(
        '\x1b[35m%s\x1b[0m',
        `${new Date().toLocaleString()} - [INFO]         --- ${message}`
    )
}

function error(message: string) {
    console.info(
        '\x1b[31m%s\x1b[0m',
        `${new Date().toLocaleString()} - [ERROR]         --- ${message}`
    )
}

export default { action, verify, info, error }