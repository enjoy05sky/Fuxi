const { defineAsyncComponent } = require("vue")

export function getAllSubComponents () {
    const context = require.context('./components', true, /\.vue$/)
    const allComponents = {}
    context.keys().forEach(key => {
      const moduleObj = context(key)
      const componentName = key.substr(0, key.lastIndexOf('/Index.vue')).split('./')[1]
      allComponents[componentName] = defineAsyncComponent({
        loader: () => Promise.resolve(moduleObj)
      })
    })
    return allComponents
}

export function convertComponentTag(str) {
  return str.replace(/([A-Z])/g, (s, q, i) => i === 0 ? s.toLowerCase() : '-' + s.toLowerCase())
}