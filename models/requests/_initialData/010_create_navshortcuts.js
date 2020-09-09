/* global $App */

module.exports = function (session) {
  const conn = session.connection

  let desktopID = conn.lookup('ubm_desktop', 'ID', {
    expression: 'code',
    condition: 'equal',
    values: { code: 'CityReq_desktop' }
  })
  if (!desktopID) {
    console.info('\t\tcreate new `City request` desktop')
    desktopID = conn.insert({
      entity: 'ubm_desktop',
      fieldList: ['ID'],
      execParams: {
        code: 'CityReq_desktop',
        caption: 'City Requests'
      }
    })
  } else {
    console.info('\t\tuse existed desktop with code `CityReq_desktop`', desktopID)
  }

  let folderID = conn.lookup('ubm_navshortcut', 'ID', {
    expression: 'code',
    condition: 'equal',
    values: { code: 'req_departments_folder' }
  })
  if (!folderID) {
    console.log('\t\tcreate `Departments` folder')
    folderID = conn.insert({
      entity: 'ubm_navshortcut',
      fieldList: ['ID'],
      execParams: {
        desktopID: desktopID,
        code: 'req_departments_folder',
        caption: 'Departments',
        isFolder: true,
        isCollapsed: false,
        displayOrder: 10
      }
    })
  } else {
    console.info('\t\tuse existed folder with code `req_departments_folder`', folderID)
  }

  let lastID = conn.lookup('ubm_navshortcut', 'ID', { expression: 'code', condition: 'equal', values: { code: 'req_depart' } })
  if (!lastID) {
    console.log('\t\t\tcreate `Department` shortcut')
    lastID = conn.insert({
      fieldList: ['ID'],
      entity: 'ubm_navshortcut',
      execParams: {
        desktopID: desktopID,
        parentID: folderID,
        code: 'req_depart',
        caption: 'Departments',
        iconCls: 'fa fa-building-o',
        displayOrder: 20,
        cmdCode: JSON.stringify({
          cmdType: 'showList',
          cmdData: { params: [{ entity: 'req_depart', method: 'select', fieldList: '*' }] }
        }, null, '\t')
      }
    })
  } else {
    console.info('\t\tuse existed shortcut with code `req_depart`', lastID)
  }

  lastID = conn.lookup('ubm_navshortcut', 'ID', {
    expression: 'code',
    condition: 'equal',
    values: { code: 'req_Subdepart' }
  })
  if (!lastID) {
    console.log('\t\t\tcreate `SubDepartments` shortcut')
    lastID = conn.insert({
      fieldList: ['ID'],
      entity: 'ubm_navshortcut',
      execParams: {
        desktopID: desktopID,
        parentID: folderID,
        code: 'req_Subdepart',
        caption: 'SubDepartments',
        iconCls: 'fa fa-user-circle-o',
        displayOrder: 30,
        cmdCode: JSON.stringify({
          cmdType: 'showList',
          cmdData: { params: [{ entity: 'req_subDepart', method: 'select', fieldList: '*' }] }
        }, null, '\t')
      }
    })
  } else {
    console.info('\t\tuse existed shortcut with code `req_subDepart`', lastID)
  }

  lastID = conn.lookup('ubm_navshortcut', 'ID', {
    expression: 'code',
    condition: 'equal',
    values: { code: 'req_reqList' }
  })
  if (!lastID) {
    console.log('\t\tcreate `requests` shortcut')
    lastID = conn.insert({
      fieldList: ['ID'],
      entity: 'ubm_navshortcut',
      execParams: {
        desktopID: desktopID,
        code: 'req_reqList',
        caption: 'Request list',
        iconCls: 'fa fa-clone',
        displayOrder: 40,
        cmdCode: `{
          "cmdType": "showList",
          "cmdData": {
            "params": [{
              "entity": "req_reqList",
              "method": "select",
              "fieldList": "*"
            }]
          },
          "customActions": [{
            "actionText": "Regions requests",
            "iconCls": "u-icon-more",
            "text": "Regions requests",
            "handler": function(cmp) {
                var config = {
                  cmdType: 'showForm',
                  method: 'select',
                  formCode: 'req_cityRegion-select',
                  entity: 'req_cityRegion'
                 }
                UB.core.UBApp.doCommand(config)
             
            }
          }]
        }`
      }
    })
  }

  lastID = conn.lookup('ubm_navshortcut', 'ID', {
    expression: 'code',
    condition: 'equal',
    values: { code: 'req_cityRegion' }
  })
  if (!lastID) {
    console.log('\t\tcreate `City regions` shortcut')
    lastID = conn.insert({
      fieldList: ['ID'],
      entity: 'ubm_navshortcut',
      execParams: {
        desktopID: desktopID,
        code: 'req_cityRegion',
        caption: 'City region',
        iconCls: 'fa fa-braille',
        displayOrder: 50,
        cmdCode: JSON.stringify({
          cmdType: 'showList',
          cmdData: { params: [{ entity: 'req_cityRegion', method: 'select', fieldList: '*' }] }
        }, null, '\t')
      }
    })
  } else {
    console.info('\t\tuse existed shortcut with code `req_cityRegion`', lastID)
  }

  lastID = conn.lookup('ubm_navshortcut', 'ID', {
    expression: 'code',
    condition: 'equal',
    values: { code: 'req_user' }
  })
  if (!lastID) {
    console.log('\t\tcreate `Users` shortcut')
    lastID = conn.insert({
      fieldList: ['ID'],
      entity: 'ubm_navshortcut',
      execParams: {
        desktopID: desktopID,
        code: 'req_user',
        caption: 'Users',
        iconCls: 'u-icon-person',
        displayOrder: 60,
        cmdCode: `{
          "cmdType": "showList",
          "cmdData": {
            "params": [{
              "entity": "req_user",
              "method": "select",
              "fieldList": [
                "*"
              ]
            }]
          },
          "customActions": [{
            "actionText": "Add users",
            "iconCls": "u-icon-download",
            "text": "Add users",
            "handler": function(cmp) {
              $App.connection.run({
                entity: 'req_user',
                method: 'addUsers'
              }).then(function(result) {
                if (result) {
                  $App.dialogInfo('Завантажено успішно')
                } else {
                  $App.dialogInfo('Під час завантаження сталася помилка')
                }
              })
            }
          }]
        }`
      }
    })
  } else {
    console.info('\t\tuse existed shortcut with code `req_user`', lastID)
  }
}
