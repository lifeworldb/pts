const chalk = require('chalk')
const figlet = require('figlet')
const program = require('commander')
const menu = require('./modules/menu')
const creator = require('./modules/creator')
const pkg = require('./package')
const log = console.log

export function cli(argv) {
    menu.showBanner()

    program
        .version(pkg.version)
        .description(pkg.description)

    program
        .command('new')
        .description('Tells you pts that you should generate a new project')
        .action(() => {
            menu.new().then((res) => {
                creator.createProject(res)
                    .then(result => menu.showFinish(result))
                    .catch(e => {})
            })
        })

    program.parse(argv)
}