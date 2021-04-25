const chalk = require("chalk")
const inquirer = require("inquirer")
const { exec } = require("child_process");
const Creates = require("../data/create.json")
const backToMenu = require("../lib/backToMenu")

module.exports = async () => {
    let CreateList = Creates.map(a => a.name)
    CreateList.push("Go back to menu")

    let CreateToInstall = await inquirer.prompt([
        {
            type: 'list',
            name: 'select',
            message: 'What type of Project you wanted to create?',
            choices: CreateList
        }
    ])

    if(CreateToInstall.select === "Go back to menu")backToMenu()
    else{
        let Create = Creates.find(x => x.name === CreateToInstall.select)
        let AreYouSureAboutThat = await inquirer.prompt([
            {
                type: 'confirm',
                name: "yes",
                message: "Are you sure, You wanted to create "+Create.name+"?"
            }
        ])
        if(!AreYouSureAboutThat.yes){
            console.log(chalk.yellow("Returning back to menu in 3 seconds..."))
            setTimeout(backToMenu, 3000)
        }
        else{
            if(Create.variables){
                for (let i = 0; i < Create.variables.length; i++) {
                    const pog = Create.variables[i];
                    let ans = await inquirer.prompt([
                        {
                            type: 'input',
                            name: "answer",
                            message: "What you wanted to keep "+pog+" as?"
                        }
                    ])
                    for (let i = 0; i < Create.commands.length; i++) {
                        const element = Create.commands[i];
                        Create.commands[i] = element.replace(new RegExp(`{${pog}}`, 'g'), ans.answer)
                    }
                }
            };
            for (let i = 0; i < Create.commands.length; i++) {
                const cmd = Create.commands[i];
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