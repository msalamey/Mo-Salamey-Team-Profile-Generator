const Manager = require("./lib/Manager"); 
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "sample.html");

const render = require("./dist/htmlRenderedOutput");

const createdTeam = [];
function createOutPut() {
    //create manager function
    const createManager = function () {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the name of the manager for this project?",
                    name: "managerName"
                },
                {
                    type: "input",
                    message: "What is the id # for the manager for this project?",
                    name: "managerId"
                },
                {
                    type: "input",
                    message: "What is the manager's email for this project?",
                    name: "managerEmail"
                },
                {
                    type: "input",
                    message: "What is the manager's office number for this project?",
                    name: "managerOfficeNumber"
                },
            ])
            .then(answers => {
                const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
                createdTeam.push(manager)
                createTeam();
            })
    }

    //create team function
    const createTeam = function () {
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Would you like to add more team members?",
                    name: "moreMembers",
                    choices: ["Yes", "No"]
                },
            ])
            .then(answers => {
           if (answers.moreMembers == "Yes"){
               selectEmployee();
           }else{
               renderHtml();
           }
            })
    }
    const selectEmployee = function () {
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Please select an employee type below:",
                    choices: ["Engineer", "Intern"],
                    name: "employeeType"
                },
            ])
            .then(answers => {
                switch (answers.employeeType) {
                    case "Engineer":
                        createEngineer();
                        break;
                    case "Intern":
                        createIntern();
                        break; 
                }
            })
            .catch(function(err) {
                console.log(err);
              });
    }
    //add Engineer function
    const createEngineer = function () {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the name of this engineer?",
                    name: "engineerName"
                },
                {
                    type: "input",
                    message: "What is the id # for this engineer?",
                    name: "engineerId"
                },
                {
                    type: "input",
                    message: "What is the engineer's email?",
                    name: "engineerEmail"
                },
                {
                    type: "input",
                    message: "What is the engineer's GitHub user name?",
                    name: "engineerGitHub"
                },
            ])
            .then(answers => {
                const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGitHub);
                createdTeam.push(engineer)
                createTeam();
            })
    }
    //add Intern function
    const createIntern = function () {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the name of this intern?",
                    name: "internName"
                },
                {
                    type: "input",
                    message: "What is the id # for this intern?",
                    name: "internId"
                },
                {
                    type: "input",
                    message: "What is the intern's email?",
                    name: "internEmail"
                },
                {
                    type: "input",
                    message: "What school is the intern attending?",
                    name: "internSchool"
                },
            ])
            .then(answers => {
                const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
                createdTeam.push(intern)
                createTeam();
            })
    }
    //build Team function
    const renderHtml = function () {
        if (!fs.existsSync(OUTPUT_DIR)) { fs.mkdirSync(OUTPUT_DIR) }
        fs.writeFileSync(outputPath, render(createdTeam))
    };

    createManager();
}
createOutPut(); 