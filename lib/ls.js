var fs = require('fs')

var preface = 'NPM - ls scripts\n---\n'

// from underscore#max
var max = function (obj, iterator, context) {
  var result = {computed : -Infinity, value: -Infinity}
  obj.forEach(function(value, index, list) {
    var computed = iterator ? iterator.call(context, value, index, list) : value
    computed > result.computed && (result = { value : value, computed : computed })
  })
  return result.value
}

// from underscore.string#strRepeat
var strRepeat = function(str, qty){
  if (qty < 1) return ''
  var result = ''
  while (qty > 0) {
    if (qty & 1) result += str
    qty >>= 1, str += str
  }
  return result
}

// from underscore.string#pad
var rpad = function (str, length, padStr) {
  str = str == null ? '' : String(str)
  length = ~~length

  if (!padStr)
    padStr = ' '
  else if (padStr.length > 1)
    padStr = padStr.charAt(0)

  var padlen = length - str.length
  return str + strRepeat(padStr, padlen)
}

var formatName = function (name, longest) {
  return rpad(name, longest, ' ')
}

var bestDesc = function (scriptName, pkg) {
  var cmd = pkg.scripts[scriptName]
  var desc = pkg.config && pkg.config.scripts ? pkg.config.scripts[scriptName] : null
  return desc ? desc : cmd
}

var ls = function () {
  fs.readFile('package.json', 'utf8', function (err, data) {
    if (err) throw err

    var pkg = JSON.parse(data)
    var scriptNames = Object.keys(pkg.scripts)
    var longest = max(scriptNames, function (name) { return name.length }).length
    var str = preface + scriptNames.map(function (name) {
      return formatName(name, longest) + ' - ' + bestDesc(name, pkg)
    }).sort().join('\n')

    console.log(str + '\n---\n')
  })
}

module.exports = ls