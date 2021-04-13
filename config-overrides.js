const {alias, aliasJest} = require('react-app-rewire-alias')

const aliasMap = {
  example: 'example/src',
  '@config': 'config/src',
}

module.exports = alias(aliasMap)
module.exports.jest = aliasJest(aliasMap)