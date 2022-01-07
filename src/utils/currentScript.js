const currentScript = document.currentScript || (function() {
    const scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
})()

/**
 * 获取当前js运行地址
 * @returns 外链js运行地址
 */
export function getRuntimePath() {
    const {protocol, host} = new URL(currentScript.src)
    return `${protocol}//${host}`
}