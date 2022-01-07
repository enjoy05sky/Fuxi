const { execSync } = require("child_process")
const { readdirSync, statSync } = require("fs")
const path = require("path")

/**
 * 查找业务组件目录指定Index.vue入口文件
 * @param {} dirPath 
 * @param {*} regStr 
 * @returns 
 */
const queryVueComponentFiles = (dirPath, regStr) => {
    let fileList = []

    const allList = readdirSync(dirPath)
    const dirName = dirPath.substr(dirPath.lastIndexOf(path.sep) + 1)

    fileList = fileList.concat(allList.filter(name => regStr.test(name)).map(name => ({name: dirName, path: `${dirPath}${path.sep}${name}`})))

    allList.forEach(name => {
        const filePath = `${dirPath}${path.sep}${name}`
        const file = statSync(filePath)
        if(file.isDirectory()) {
            fileList = fileList.concat(queryVueComponentFiles(filePath, regStr))
        }
    })

    return fileList
}

/**
 * 打包业务组件
 * @param {name: 组件名称 path组件入口文件路径} param0 
 */
const buildVueComponentFile = ({name: vueComponentName, path: vueComponentPath}) => {
    execSync(`vue-cli-service build --target lib --name ${vueComponentName} "${vueComponentPath}" --dest dist/${vueComponentName}`)
}

const rootDirPath = path.resolve(__dirname, './components')
const vueFileList = queryVueComponentFiles(rootDirPath, /^Index.vue$/)
try {
    vueFileList.forEach(buildVueComponentFile)
} catch(err) {
    console.error(err)
}
