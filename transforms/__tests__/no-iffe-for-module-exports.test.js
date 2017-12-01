import { defineTest } from 'jscodeshift/dist/testUtils'

const options = {
  paths: [],
  printOptions: {
    trailingComma: true,
    quote: 'single',
    lineTerminator: '\n'
  },
  'inline-single-expressions': true
}

defineTest(__dirname, 'no-iffe-for-module-exports', options)
