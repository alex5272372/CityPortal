module.exports = function (session) {
  const path = require('path')
  const fs = require('fs')
  const { dataLoader, csv } = require('@unitybase/base')
  const conn = session.connection
  const fn = path.join(__dirname, '/ubm_enum-req.csv')
  let fContent = fs.readFileSync(fn, { encoding: 'utf8' })
  if (!fContent) { throw new Error(`File ${fn} is empty or not exist`) }
  fContent = fContent.trim()
  const csvData = csv.parse(fContent)
  const notExisted = csvData.filter(
    (row) => !conn.lookup('ubm_enum', 'code',
      conn.Repository('ubm_enum').where('code', '=', row[1]).ubql().whereList
    )
  )
  console.info('\t\tFill enumeration for requests model')
  dataLoader.loadArrayData(conn, notExisted, 'ubm_enum', 'eGroup;code;name;sortOrder'.split(';'), [0, 1, 2, 3])
}
