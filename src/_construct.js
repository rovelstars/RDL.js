const fs = require("fs")
const path = require("path")

const outFile = path.join(__dirname, "index.js")
const src = "."

let str = "module.exports = {"

const folders = fs.readdirSync(src).filter(file => fs.statSync(path.join(src, file)).isDirectory())
folders.forEach(folder => {
    const folderDir = `${src}/${folder}`
    str = str + `\n\n// ${folder.toUpperCase()}`

    fs.readdirSync(folderDir)
    .filter(file => fs.statSync(path.join(folderDir, file)).isFile())
    .forEach(file => {
        const fileDir = `${folderDir}/${file}`
        const fileName = file.split(".")[0]
        str = str + `\n    ${fileName}: require("${fileDir}"),`
    })
})

str = str + "\n}"

fs.writeFileSync(outFile, str)