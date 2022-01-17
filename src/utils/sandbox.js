export default class MultipleProxySandbox {
    updatedValueSet  = new Set()
  active() {
    this.sandboxRunning = true;
  }
  inactive() {
    this.sandboxRunning = false;
  }

  run(code) {
    code = "with(sandbox){" + code + "\n}";
    const runCode = new Function("sandbox", code);
    return runCode(this.proxy);
  }

  /**
   * 构造函数
   * @param {*} name 沙箱名称
   * @returns
   */
  constructor(name) {
    this.name = name;
    this.proxy = null;
    const rawWindow = window;
    const fakeWindow = Object.create(null)
    // const iframe = document.createElement('iframe', {url: 'about:blank'})
    // document.body.appendChild(iframe)
    // const fakeWindow = iframe.contentWindow // 沙箱运行时的全局对象
    const proxy = new Proxy(fakeWindow, {
      set: (target, name, value) => {
        if (this.sandboxRunning) {
            target[name] = value;
        }
        return true;
      },
      get: (target, name) => {
        // 优先使用共享对象
        if (Object.keys(fakeWindow).includes(name)) {
          return fakeWindow[name];
        }

        // eslint-disable-next-line no-undef
        // if (name === Symbol.unscopables) return unscopables;

        if(name === 'fetch' || name === 'setTimeout') return rawWindow[name].bind(rawWindow)

        // widow, self 返回全局代理
        if (name === 'window' || name === 'self') {
          return proxy;
        }

        if (
            name === 'top' ||
           name === 'parent' ||
          (process.env.NODE_ENV === 'test' && (name === 'mockTop' || name === 'mockSafariTop'))
        ) {
          // if your master app in an iframe context, allow these props escape the sandbox
          // iframe 嵌套
          if (rawWindow === rawWindow.parent) {
            return proxy;
          }
          return rawWindow[name];
        }


        return rawWindow[name];
      },
      has() {
        return true
      }
    });
    this.proxy = proxy;
  }
}
