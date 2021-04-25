const fetch = require("node-fetch")
const backToMenu = require("../lib/backToMenu")
const { exec } = require("child_process")

module.exports = async () => {
    let CheckVersion = await fetch("https://raw.githubusercontent.com/SudhanPlayz/SudhanCLI/master/package.json").then(res => res.json())
    if(CheckVersion.version !== require("../package.json").version){
        console.log("Updating package...")
        exec("npm i sudhan -g", (err, stdout, stderr) => {
            if(err)console.log("Error:\n"+err)
            if(stdout)console.log(stdout)
            if(stderr)console.log(stderr)
            process.exit()
        })
    }else{
        console.log("Sudhan CLI is upto date, Redirecting to main menu after 2 seconds")
        setTimeout(backToMenu, 2000)
    }
}