#!/usr/bin/env node
const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const program = require('commander')
const menu = require('./modules/menu')
const creator = require('./modules/creator')
const BLOCKS = require('cli-block')
const pkg = require('./package')
const log = console.log

clear()
BLOCKS.BLOCK_START("Project Template Starter")
BLOCKS.BLOCK_LINE(pkg.description)
BLOCKS.BLOCK_LINE()
BLOCKS.BLOCK_MID(`Version: ${pkg.version}`)
BLOCKS.BLOCK_END()

program
  .version(pkg.version)
  .description(pkg.description)

program
  .command('new')
  .description('Tells you pts that you should generate a new project')
  .action(() => {
    menu.new().then((res) => {
      creator.createProject(res)
    })
  })

program.parse(process.argv)
