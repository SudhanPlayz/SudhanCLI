const chalk = require("chalk")
const figlet = require("figlet")

module.exports = () => {
    figlet("Sudhan CLI", { font: "slant" }, (err, res) => {
        if(err)throw err
        console.clear()
        console.log(`${chalk.blue(res)}
Version: ${chalk.yellow(require("../package.json").version)}\n`)
        require("../lib/menu")()
    })
}