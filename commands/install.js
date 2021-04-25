const chalk = require("chalk")
const inquirer = require("inquirer")
const { exec } = require("child_process");
const Packages = require("../data/packages.json")
const backToMenu = require("../lib/backToMenu")

module.exports = async () => {
    let PackageList = Packages.map(a => a.name)
    PackageList.push("Go back to menu")

    let PackageToInstall = await inquirer.prompt([
        {
            type: 'list',
            name: 'select',
            message: 'What you want to install?',
            choices: PackageList
        }
    ])

    if(PackageToInstall.select === "Go back to menu")backToMenu()
    else{
        let Package = Packages.find(x => x.name === PackageToInstall.select)
        let AreYouSureAboutThat = await inquirer.prompt([
            {
                type: 'confirm',
                name: "yes",
                message: "Are you sure, You wanted to install "+Package.name+"?"
            }
        ])
        if(!AreYouSureAboutThat.yes){
            console.log(chalk.yellow("Returning back to menu in 3 seconds..."))
            setTimeout(backToMenu, 3000)
        }
        else{
            for (let i = 0; i < Package.commands.length; i++) {
                const cmd = Package.commands[i];
                let ExecutePromise = new Promise(Resolve => {
                    exec(cmd, (err, stdout, stderr) => {
                        if(err)console.log("Error:\n"+err)
                        if(stdout)console.log(stdout)
                        if(stderr)console.log(stderr)
                        Resolve()
                    })
                })
                await ExecutePromise;
            }
        }
    }
}