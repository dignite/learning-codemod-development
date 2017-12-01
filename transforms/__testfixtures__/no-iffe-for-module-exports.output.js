const a = '1'
const b = '2'
function innerFunction () {
  return '3'
}

module.exports = { a, b, innerFunction }

module.exports = function () { console.log('Do not touch this') }
module.exports = 'Do not touch this'
