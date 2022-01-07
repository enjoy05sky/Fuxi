<template>
    <div class="sub-a" @click="clickHandler">{{textRef}}</div>
    <img src="@/assets/logo.png" />
</template>
<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {
        let textRef = ref('this is a text')
        const clickHandler = () => {
            textRef.value = 'this is text A'
        }
        return {
            textRef,
            clickHandler
        }
    },
}
</script>
<style scoped>
.sub-a {
    color: red;
}
</style>