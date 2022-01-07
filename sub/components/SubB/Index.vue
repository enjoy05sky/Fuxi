<template>
    <div class="sub-b">{{textRef}}</div>
</template>
<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {
        let textRef = ref('b section')
        return {
            textRef
        }
    },
}
</script>
<style scoped>
.sub-b {
    color: blue;
}
</style>