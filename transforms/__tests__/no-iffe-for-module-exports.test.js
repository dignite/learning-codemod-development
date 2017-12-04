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

defineTest(__dirname, 'no-iffe-for-module-exports', options, 'no-iffe-for-module-exports/no-unwrap-1')
defineTest(__dirname, 'no-iffe-for-module-exports', options, 'no-iffe-for-module-exports/no-unwrap-2')
defineTest(__dirname, 'no-iffe-for-module-exports', options, 'no-iffe-for-module-exports/no-unwrap-3')
defineTest(__dirname, 'no-iffe-for-module-exports', options, 'no-iffe-for-module-exports/iffe-unwrap-1')
defineTest(__dirname, 'no-iffe-for-module-exports', options, 'no-iffe-for-module-exports/iffe-unwrap-2')
defineTest(__dirname, 'no-iffe-for-module-exports', options, 'no-iffe-for-module-exports/iffe-unwrap-3')
defineTest(__dirname, 'no-iffe-for-module-exports', options, 'no-iffe-for-module-exports/iffe-unwrap-4')
