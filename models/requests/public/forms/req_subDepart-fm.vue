<template>
  <el-form label-position="left" label-width="180px" class="req_subDepartment__form">
  </el-form>
</template>

<script>
module.exports.default = {}

const { mountUtils, Form } = require("@unitybase/adminui-vue")
module.exports.mount = function({ title, entity, instanceID, formCode, rootComponent }) {
  // mountUtils.mountModal
  Form({ component: rootComponent, title, formCode, entity: entity }).mount()
}
</script>

<style>
.req_subDepartment__form {
  overflow: auto;
  height: 100%;
}
</style>
