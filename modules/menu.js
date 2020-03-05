const prompts = require('prompts')

const questions = [
  {
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
  new: async () => {
    return await prompts(questions)
  }
}
