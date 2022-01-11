(function() {
    const currentScript = (function() {
        const scripts = document.getElementsByTagName('script')
        return scripts[scripts.length - 1]
    })()
    const {protocol, host} = new URL(currentScript.src)
    console.log(`${protocol}//${host}`)
})()