const chalk = require("chalk")
const inquirer = require("inquirer")

module.exports = async () => {
    let Selected = await inquirer.prompt([
        {
            type: 'list',
            name: 'select',
            message: 'What you want to do?',
            choices: [
                "Install",
                "Create project",
                "Utils",
                "Update",
                "Exit"
            ]
        }
    ])
    Selected = Selected.select

    //I should have used fs and done it automatically but it taking a long time process :/
    if(Selected === "Install")require("../commands/install")()
    else if(Selected === "Create project")require("../commands/create")()
    else if(Selected === "Utils")require("../commands/util")()
    else if(Selected === "Update")require("../commands/update")()
    else {
        console.log(chalk.green("Exiting sudhan CLI..."))
        process.exit(1)
    }
}