const convertMarkdown = require('./convert_markdown')
const enValues = require('../../../original/server.en.json')

module.exports = lang => {
  const langValues = require(`../../../translations/server/${lang}.json`)
  const langClientDistValues = require(`../../../dist/client/${lang}.json`)
  const distValues = {}

  for (const key in enValues) {
    // Borrowing values from the client
    const enValue = enValues[key]
    if (enValue === '__reuse_client_value') {
      distValues[key] = langClientDistValues[key]
    } else {
      const langValue = langValues[key]
      distValues[key] = convertMarkdown(langValue || enValue)
    }
  }

  return distValues
}
