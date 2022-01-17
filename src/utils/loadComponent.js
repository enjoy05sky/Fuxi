import { defineAsyncComponent, defineComponent, h } from "vue"
import MultipleProxySandbox from "./sandbox"

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

// const getRemoteComponent = ({src, name}) => new Promise((resolve, reject) => {
//         const scriptDom = document.createElement('script')
//         const headDom = document.getElementsByTagName('head')
//         scriptDom.src = src
//         scriptDom.onload = function() {
//             headDom[0].removeChild(scriptDom)
//             resolve(window[name])
//         }
//         scriptDom.onerror = function(err) {
//             reject(`get remote component error, reason: ${err}`)
//         }
//         headDom[0].appendChild(scriptDom)
//         setTimeout(reject, 3*1000)
//     })

const runRemoteComponent = ({src, name}) => new Promise((resolve) => {
    return fetch(src).then(res => {
        return res.text().then(data => {
            // console.log(data)
            const sandboxIns = new MultipleProxySandbox(name)
            sandboxIns.active()
            const addrs = src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
            sandboxIns.proxy.__INJECTED_PUBLIC_PATH_BY_FUXI__ = addrs[1]
            try {
                sandboxIns.run(data)
            } catch(e) {
                console.log(e)
            }
            !window.proxyList && (window.proxyList = {})
            window.proxyList[name] = sandboxIns.proxy         
            // window.__INJECTED_PUBLIC_PATH_BY_FUXI__ = addrs[1]
            if(sandboxIns.proxy[name]) resolve(sandboxIns.proxy[name])
        })
        
    })
})

const loadRemoteComponent = (...args) => defineAsyncComponent({
        loader: () => runRemoteComponent(...args),
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