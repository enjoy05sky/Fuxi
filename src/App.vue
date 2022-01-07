<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <component v-for="componentName in subComponentNames" :key="componentName" :is="componentName" />
</template>

<script>
import { reactive } from '@vue/runtime-core'
import { getAllSubComponents, convertComponentTag } from '../sub/index'

const subComponents = getAllSubComponents()
console.log(document.runtimePath)

export default {
  name: 'App',
  components: subComponents,
  setup() {
    const subComponentNames =  reactive(Object.keys(subComponents).map(name => convertComponentTag(name)))
    return {
      subComponentNames
    }
    // return () => h('div', {id: 'container'}, subComponentTags.map(tag => h(convertComponentTag(tag))))
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
