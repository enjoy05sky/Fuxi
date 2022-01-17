<template>
    <div>
        <div class="container" @click="clickHandler">{{textRef}}</div>
        <img src="@/assets/logo.png" />
    </div>
</template>
<script>
import { ref } from '@vue/reactivity'
export default {
    name: "SubA",
    setup() {
        window.aaa = 123;
        let textRef = ref('this is a text')
        const clickHandler = () => {
            textRef.value = 'this is text A'
            // eslint-disable-next-line no-undef
            fetch(__webpack_public_path__ + '/asa')
        }

        console.log(setTimeout(clickHandler, 3000))
        return {
            textRef,
            clickHandler
        }
    },
}
</script>
<style>
body {
    font-size: 20px;
}
</style>
<style scoped>
.container {
    color: red;
}
</style>