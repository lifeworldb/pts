const prompts = require('prompts')
const BLOCKS = require('cli-block')
const clear = require('clear')
const pkg = require('../package')
const emoji = require('node-emoji')

const questions = [{
        type: 'text',
        name: 'projectName',
        message: 'What is your Project Name',
        style: '✍🏻',
        validate: value => value !== '' && value.length > 4 ? true : 'The name cannot be empty and must be greater than 8 characters'
    },
    {
        type: 'select',
        name: 'typeProject',
        message: 'Select a type of project',
        choices: [
            { title: 'Graphql', description: 'Create new project for Graphql', value: 'graphql' }
        ]
    },
    {
        type: 'select',
        name: 'template',
        message: 'Select a template',
        choices: [
            { title: 'Apollo Server Express', value: 'apolloExpress' }
        ]
    },
    {
        type: 'text',
        name: 'pathProject',
        message: 'The project creation path',
        initial: process.cwd()
    }
]

module.exports = {
    new: async() => {
        return await prompts(questions)
    },
    showBanner: () => {
        clear()
        BLOCKS.BLOCK_START("Project Template Starter")
        BLOCKS.BLOCK_LINE(pkg.description)
        BLOCKS.BLOCK_LINE()
        BLOCKS.BLOCK_MID(`Version: ${pkg.version}`)
        BLOCKS.BLOCK_END()
    },
    showFinish: ({ projectName, typeProject, template }) => {
        BLOCKS.BLOCK_START()
        BLOCKS.BLOCK_LINE(pkg.description)
        BLOCKS.BLOCK_LINE()
        BLOCKS.BLOCK_ROW_LINE(['Name Project', 'Type Project', 'Template'])
        BLOCKS.BLOCK_ROW_LINE([projectName, typeProject, template])
        BLOCKS.BLOCK_LINE()
        BLOCKS.BLOCK_LINE('Next Step:')
        BLOCKS.BLOCK_LINE()
        BLOCKS.BLOCK_LINE(`$ cd ${projectName}`)
        BLOCKS.BLOCK_LINE()
        BLOCKS.BLOCK_LINE('$ npm start or yarn start')
        BLOCKS.BLOCK_LINE()
        BLOCKS.BLOCK_LINE(`${emoji.get('sunglasses')} Enjoy ${emoji.get('sunglasses')}`)
        BLOCKS.BLOCK_END()
    }
}