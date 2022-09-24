#! /usr/bin/env node
const chalk = require("chalk");
const figlet = require("figlet");

console.clear();

figlet("Sudhan CLI", {
    font: "slant"
}, (err, res) => {
    if(err) throw err;

    console.log(
        `${chalk.blue(res)}
        Version: ${chalk.yellow(require("../package.json").version)}\n`
    );

    require('./menu')();
});
