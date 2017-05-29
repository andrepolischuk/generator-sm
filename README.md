# generator-sm [![Build Status][travis-image]][travis-url]

> Simple generator for node and browser modules

* JavaScript [Standard style][standard]
* ES2015
* Testing with [AVA][ava]
* Ready to use with [Travis CI][travis]

## Install

```sh
npm install --global yo generator-sm
```

## Usage

```sh
yo sm
```
```sh
yo sm --help

Usage:
  yo sm [options] [<name>]

Options:
  -h,   --help          # Print the generator's options and usage
        --skip-cache    # Do not remember prompt answers             Default: false
        --skip-install  # Do not automatically install dependencies  Default: false
  -d,   --description   # Your module description
  -u,   --username      # Your github username

Arguments:
  name  # Your module name: `yo sm unicorn`  Type: String  Required: false
```

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/generator-sm
[travis-image]: https://travis-ci.org/andrepolischuk/generator-sm.svg?branch=master

[ava]: https://github.com/sindresorhus/ava
[travis]: https://travis-ci.org
[standard]: https://github.com/feross/standard
