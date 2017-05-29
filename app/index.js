'use strict'
const Generator = require('yeoman-generator')
const toSlugCase = require('to-slug-case')
const toCamelCase = require('to-camel-case')
const githubUser = require('gh-user')
const githubUsername = require('github-username')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.argument('name', {
      type: String,
      required: false,
      desc: 'Your module name: `yo sm unicorn`'
    })

    this.option('description', {
      type: String,
      alias: 'd',
      required: false,
      desc: 'Your module description'
    })

    this.option('username', {
      type: String,
      alias: 'u',
      required: false,
      desc: 'Your github username'
    })
  }

  initializing () {
    const getUsername = options => {
      if (!options.username && options.gitEmail) {
        return githubUsername(options.gitEmail).then(username => {
          return Object.assign({}, options, {
            gitUsername: username
          })
        })
      }

      return Promise.resolve(options)
    }

    const getAnswers = options => this.prompt([
      {
        name: 'name',
        message: 'Your module name',
        default: toSlugCase(this.appname),
        when: !options.name
      },
      {
        name: 'description',
        message: 'Your module description',
        default: '...',
        when: !options.description
      },
      {
        name: 'username',
        message: 'Your github username',
        default: options.gitUsername,
        store: true,
        when: !options.username
      }
    ]).then(answers => Object.assign({}, options, answers))

    const composeTemplate = options => githubUser(options.username).then(user => ({
      name: options.name,
      camelName: toCamelCase(options.name),
      description: options.description,
      githubUsername: options.username,
      githubName: user.name,
      githubEmail: options.gitEmail,
      githubWebsite: user.blog
    }))

    const mv = (from, to) => this.fs.move(this.destinationPath(from), this.destinationPath(to))

    const createFiles = tpl => {
      this.fs.copyTpl(`${this.templatePath()}/**`, this.destinationPath(), tpl)

      mv('editorconfig', '.editorconfig')
      mv('gitignore', '.gitignore')
      mv('travis.yml', '.travis.yml')
      mv('_package.json', 'package.json')
    }

    const options = Object.assign({}, this.options, {
      gitEmail: this.user.git.email()
    })

    return getUsername(options)
      .then(getAnswers)
      .then(composeTemplate)
      .then(createFiles)
      .catch((err) => {
        throw err
      })
  }

  writing () {
    this.spawnCommandSync('git', ['init'])
  }

  install () {
    if (!this.options['skip-install']) {
      this.npmInstall()
    }
  }
}
