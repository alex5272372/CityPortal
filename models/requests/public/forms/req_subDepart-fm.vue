<template>
  <div class="u-form-layout">
    <u-toolbar />
    <u-form-container
      v-loading.body="loading"
    >
      <u-auto-field attribute-name="name" />
      <u-auto-field attribute-name="department" />
    </u-form-container>
  </div>
</template>

<script>
const { Form } = require("@unitybase/adminui-vue")
const { mapGetters } = require('vuex')

module.exports.mount = cfg => {
  Form(cfg)
    .processing()
    .validation()
    .mount()
}

module.exports.default = {
  name: 'ReqSubDepart',
  computed: {
    ...mapGetters(['loading'])
  }
}
</script>
