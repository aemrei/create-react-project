import arg from 'arg';
import inquirer from 'inquirer';
import {createProject} from "./main";

async function getConfig(rawArgs) {
    const args = arg({
        '--typescript': Boolean,
        '--git': Boolean,
        '-ts': '--typescript',
        '-g': '--git'
    }, {
        argv: rawArgs.slice(2)
    })
    const options = {
        directory: args._[0],
        typescript: args['--typescript'] || false,
        git: args['--git'] || false,
        redux: args['--redux'] || false
    }

    const questions = []
    // Package Manager Options
    questions.push({
        type: 'list',
        name: 'pkgMgr',
        message: 'Which Package Manager to Use',
        choices: ['NPM', 'Yarn'],
        default: 'NPM'
    })
    // Project Name
    if (!options.directory) {
        questions.push({
            name: 'directory',
            message: 'Project Name',
            default: 'my-project'
        })
    }

    if (!options.typescript) {
        questions.push({
            name: 'typescript',
            type: 'confirm',
            message: 'Enable TypeScript',
            default: true
        })
    }

    if (!options.git) {
        questions.push({
            name: 'git',
            type: 'confirm',
            message: 'Enable Git',
            default: true
        })
    }

    if (!options.reduxToolkit) {
        questions.push({
            name: 'reduxToolkit',
            type: 'confirm',
            message: 'Enable Redux Toolkit',
            default: false
        })
    }

    const answers = await inquirer.prompt(questions);

    return {
        pkgMgr: answers.pkgMgr,
        directory: options.directory || answers.directory,
        typescript: options.typescript || answers.typescript,
        git: options.git || answers.git,
        reduxToolkit: options.reduxToolkit || answers.reduxToolkit,
    }
}


export async function cli(args) {
    const options = await getConfig(args)
    await createProject(options)
}