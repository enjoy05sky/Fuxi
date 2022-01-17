<template>
    <div>
        <div class="container">{{textRef}}</div>
        <img src="@/assets/logoB.png" alt="B" />
    </div>
</template>
<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {
        window.aaa = 321;
        let textRef = ref('b section')
        return {
            textRef
        }
    },
}
</script>
<style scoped>
.container {
    color: blue;
}
</style>