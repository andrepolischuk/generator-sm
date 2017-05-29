import test from 'ava'
import pify from 'pify'
import helpers from 'yeoman-test'
import assert from 'yeoman-assert'

const createGenerator = helpers.createGenerator.bind(helpers, 'sm:app', [`${__dirname}/app`], null)

test.beforeEach(async () => {
  await pify(helpers.testDirectory)(`${__dirname}/temp`)
})

test.serial('generate files', async () => {
  const generator = createGenerator({
    'skip-install': true
  })

  helpers.mockPrompt(generator, {
    name: 'test',
    description: 'Test',
    username: 'andrepolischuk'
  })

  await pify(generator.run.bind(generator))()

  assert.file([
    '.editorconfig',
    '.git',
    '.gitignore',
    '.travis.yml',
    'index.js',
    'test.js',
    'package.json',
    'README.md'
  ])

  assert.fileContent('package.json', /"name": "test"/)
  assert.fileContent('package.json', /"main": "dist\/index\.js"/)
  assert.fileContent('package.json', /"author": "Andrey Polischuk/)
})
