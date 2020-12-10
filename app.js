const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//ARRAY FOR EMPLOYEE OBJECTS
const createTeamRoster = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//FUNCTION TO PROMPT USER WITH QUESTIONS TO ADD TO EMPLOYEE CLASS
function generateEmployee() {
    inquirer.prompt([
       { 
           type: "input",
           name: "name",
           message: "What is the employees's name?"
       },
       {
           type: "input",
           name: "id",
           message: "What is the employees's ID number?"
       },
       {
           type: "input",
           name: "email",
           message: "What is the employees's email address?"
       }
   ])
   // ADDS ANSWERS TO EMPLOYEE CLASS, THEN ASKS FOR ROLE TO ASSIGN
   .then(function (answers) {
       let employee = new Employee(answers.name, answers.id, answers.email);
       inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What role would you like this created for?",
            choices: ["Manager", "Engineer", "Intern"]
        }
        //START NEW FUNCTION DEPENDING ON ROLE ANSWER
    ]).then (function (answers) {
        if (answers.role === "Manager") {
           generateManager(employee);
            
        } else if (answers.role === "Engineer") {
            generateEngineer(employee);
        } else {
            generateIntern(employee);
        }
        })
    }) .catch(function(err) {
       console.log(err);
     });
}
//FUNCTION TO ASK MANAGER SPECIFIC QUESTION
function generateManager(employee) {
    inquirer.prompt([
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?"
        },
        {
            type: "list",
            name: "addmore",
            message: "Would you like to add another employee?",
            choices: ["Yes", "No"]
        }
    ]).then(function (answers) {
        let manager = new Manager(employee.name, employee.id, employee.email, answers.officeNumber);
        createTeamRoster.push(manager);
        if (answers.addmore === "Yes") {
            generateEmployee();
        } else {
            generateTeam();
        }
        

    }).catch(function(err) {
        console.log(err);
      });
}
// FUNCTION TO ADD ENGINEER
function generateEngineer(employee) {
    inquirer.prompt([
        {
            type: "input",
            name: "gitHub",
            message: "What is the engineer's GitHub username?"
        },
        {
            type: "list",
            name: "addmore",
            message: "Would you like to add another employee?",
            choices: ["Yes", "No"]
        }
    ]).then(function (answers) {
        let engineer = new Engineer(employee.name, employee.id, employee.email, answers.gitHub);
        createTeamRoster.push(engineer);
        if (answers.addmore === "Yes") {
            generateEmployee();
        } else {
            generateTeam();
        }
    }).catch(function(err) {
        console.log(err);
      });
}

//FUNCTION TO ADD INTERN
function generateIntern(employee) {
    inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "What school is the intern attending?"
        },
        {
            type: "list",
            name: "addmore",
            message: "Would you like to add another employee?",
            choices: ["Yes", "No"]
        }
    ]).then(function (answers) {
        let intern = new Intern(employee.name, employee.id, employee.email, answers.school);
        createTeamRoster.push(intern);
        if (answers.addmore === "Yes") {
            generateEmployee();
        } else {
            generateTeam();
        }
        
    }).catch(function(err) {
        console.log(err);
      });
}
//FUNCTION TO WRITE HTML FILE TO OUTPUT FOLDER, BY USING THE HTML BLOCKS RENDERED WITH THE TEAMROSTER ARRAY
function generateTeam() {
    const makeit = render(createTeamRoster);
    fs.writeFile(outputPath, makeit, {}, () => console.log("Thanks, your page has been generated"));
}
//CALL GENERATER EMPLOYEE FUNCTION TO START APP
generateEmployee();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
