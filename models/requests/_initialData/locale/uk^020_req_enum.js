module.exports = function (session) {
  const loader = require('@unitybase/base').dataLoader
  let localizationConfig = {
    entity: 'ubm_enum',
    keyAttribute: 'code',
    localization: [
      { keyValue: 'NEW', execParams: { name: 'Новий' } },
      { keyValue: 'PROCESSED', execParams: { name: 'У обробці' } },
      { keyValue: 'REJECTED', execParams: { name: 'Відхилено' } },
      { keyValue: 'CLOSED', execParams: { name: 'Закрито' } }
    ]
  }
  loader.localizeEntity(session, localizationConfig, __filename)
}
