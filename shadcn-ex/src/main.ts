#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");

const {install_component} = require("./install");

const program = new Command();

program
    .name("shadcn-ex")
    .description("shadcn/ui extension templates")
    .version("1.0.0");

program
    .arguments("<command>", "add")
    .argument("<component>", "Name of the component to add to current project")
    .action((command: string, component: string) => {
        if(command === "add") {
            install_component(component);
        }
    })
    

program.parse();