// Don't transform this due to variable collision

const a = 'module scope collision' //eslint-disable-line

module.exports = (function () {
  const a = '1'
  const b = '2'
  function innerFunction () {
    return '3'
  }

  return { a, b, innerFunction }
}())
