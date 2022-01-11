<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
      <component
        v-for="component in remoteComponents"
        :key="component.name"
        :is="component.name"
      />
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { convertComponentTag } from "../sub/index";
import { useRemoteComponentManager } from "./utils/loadComponent";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "App",
  setup() {
    const {
      registryRemoteComponent,
      fetchRemoteComponents,
    } = useRemoteComponentManager();

    let remoteComponents = reactive([]);

    onMounted(async () => {
      const list = await fetchRemoteComponents();
      Promise.all(list.map(c => registryRemoteComponent(c))).then(() => {
        remoteComponents.push(...list.map(item => ({name: convertComponentTag(item.name)})))
      })
    })

    return {
      remoteComponents,
    }
  },
};
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
