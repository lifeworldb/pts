const { templates } = require('./selectTemplate')
const fs = require('fs')
const execa = require('execa')
const Listr = require('listr')

const tasks = new Listr([{
        title: 'Create Project',
        task: ({ template }) => {
            return new Listr([{
                    title: 'Checking project folder exist',
                    task: ({ pathProject, projectName }) => {
                        if (fs.existsSync(`${pathProject}/${projectName}`))
                            throw new Error('The project directory already exists.')
                    }
                },
                {
                    title: 'Checking git template',
                    task: async() => {
                        await execa('git', ['ls-remote', '--exit-code', '-h', `${templates[template].repository}`])
                            .catch(() => {
                                throw new Error('Unclean working tree. Commit or stash changes first.')
                            })
                    }
                },
                {
                    title: 'Cloning template',
                    task: async({ template, pathProject, projectName }) => {
                        await execa('git', ['clone', `${templates[template].repository}`, `${pathProject}/${projectName}`])
                            .catch(() => {
                                throw new Error('An error occurred while trying to clone the template.')
                            })
                    }
                }
            ], { concurrent: false })
        }
    },
    {
        title: 'Setup Project',
        task: ({ template }) => {
            return new Listr([{
                    title: 'Clean Git',
                    task: ({ pathProject, projectName }) => {
                        try {
                            deleteFolderRecursive(`${pathProject}/${projectName}/.git`)
                        } catch (e) {}
                    }
                },
                {
                    title: 'Install package dependencies with Yarn',
                    task: (ctx, task) => execa('yarn', ['install', '--cwd', `${ctx.pathProject}/${ctx.projectName}`])
                        .catch(() => {
                            ctx.yarn = false;

                            task.skip('Yarn not available, install it via `npm install -g yarn`');
                        })
                },
                {
                    title: 'Install package dependencies with npm',
                    enabled: ctx => ctx.yarn === false,
                    task: ({ pathProject, projectName }) => execa('npm', ['install', `${pathProject}/${projectName}`])
                }
            ], { concurrent: false })
        }
    }
])

let deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index) {
            let curPath = path + '/' + file
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

module.exports = {
    createProject: (objCreate) => {
        return new Promise((resolve, reject) => tasks.run(objCreate)
            .then(ctx => resolve(ctx))
            .catch(e => reject(e))
        )
    }
}