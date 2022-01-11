import { defineAsyncComponent, defineComponent, h } from "vue"

const LoadingComponent = defineComponent({
    render: () =>  h('div', {class: 'loading-component'}, 'component loading...')
})

const ErrorComponent = defineComponent({
    render: () => h('div', {class: 'error-component'}, 'component load error!')
})

function fetchRemoteComponents() {
    return new Promise((resolve) => resolve([
        {
            name: 'SubA',
            src: 'http://localhost:9080/SubA/SubA.umd.js'
        },
        {
            name: 'SubB',
            src: 'http://localhost:9080/SubB/SubB.umd.js'
        }
    ]))
}

const getRemoteComponent = ({src, name}) => new Promise((resolve, reject) => {
        const scriptDom = document.createElement('script')
        const headDom = document.getElementsByTagName('head')
        scriptDom.src = src
        scriptDom.onload = function() {
            headDom[0].removeChild(scriptDom)
            resolve(window[name])
        }
        scriptDom.onerror = function(err) {
            reject(`get remote component error, reason: ${err}`)
        }
        headDom[0].appendChild(scriptDom)
        setTimeout(reject, 3*1000)
    })

const loadRemoteComponent = (...args) => defineAsyncComponent({
        loader: () => getRemoteComponent(...args),
        timeout: 10 * 1000,
        loadingComponent: LoadingComponent,
        errorComponent: ErrorComponent
    })

async function registryRemoteComponent({src, name}) {
    return window.__fuxi_App__.component(name, loadRemoteComponent({src, name}))
}

export function useRemoteComponentManager() {
    return {
        fetchRemoteComponents,
        loadRemoteComponent,
        registryRemoteComponent
    }
}