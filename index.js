//requiring libs to use
const inquirer = require('inquirer');
const path = require("path");
const fs = require("fs");

//requiring constructors
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// Making the file storage variables
const dist = path.resolve(__dirname, "dist");
const HTML = path.join(dist, "index.html");


// Rendering the Page-template
const PageTemplate = require("./src/page-template")

// This will get the role of what we need to add. 
const getNextRole = () => {
 return inquirer.prompt(
    {
      type:"list",
      name:"role",
      message:`Which role would you like to add?`,
      choices: ["Engineer", "Intern", "All done building my Team"] 
    }
  )};

// This Inquirer function will be called for all Roles but it will adapt the question depending on the role chosen.
// It will always run through once to set up a Manager for the team 
const getEmployeeInfo = (role) => {
  return inquirer.prompt([
    {
      type:"input",
      name:"employeeName",
      message:`What is the ${role}'s Name? (Required)`,
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log(`You need to enter a ${role}'s name`);
          return false;
        }
      }
    },
    {
      type:"input",
      name:"employeeID",
      message:`What is the ${role}'s ID? (Required)`,
      validate: idInput => {
        if (idInput) {
          return true;
        } else {
          console.log(`You need to enter a ${role}'s ID`);
          return false;
        }
      }
    },
    {
      type:"input",
      name:"employeeEmail",
      message:`What is the ${role}'s Email? (Required)`,
      validate: emailInput => {
        if (emailInput) {
          return true;
        } else {
          console.log(`You need to enter a ${role}'s Email`);
          return false;
        }
      }
    }
  ]);
};
// Reusing the Employee inquirer prompt and adding on Manager Office Number
const getManagerInfo =  async () => {
  const {employeeName, employeeID, employeeEmail} = await getEmployeeInfo("Manager")
  const {officeNumber} = await inquirer.prompt({
    type:"input",
    name:"officeNumber",
    message:"What is the Manager's Office Number? (Required)",
    validate: officeNumberInput => {
      if (officeNumberInput) {
        return true;
      } else {
        console.log('You need to enter a Manager\'s Office Number');
        return false;
      }
      }
    });
    return {employeeName, employeeID, employeeEmail, officeNumber};
};
// Reusing the Employee inquirer prompt and adding on Engineer Github
const getEngineerInfo =  async () => {
  const {employeeName, employeeID, employeeEmail} = await getEmployeeInfo("Engineer")
    const {GitHub} = await inquirer.prompt({
      type:"input",
      name:"GitHub",
      message:"What is the Engineer's GitHub? (Required)",
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('You need to enter a Engineer\'s GitHub');
          return false;
        }
      }
    });
    return {employeeName, employeeID, employeeEmail, GitHub};
};

// Reusing the Employee inquirer prompt and adding on Intern school question
const getInternInfo =  async () => {
  const {employeeName, employeeID, employeeEmail} = await getEmployeeInfo("Intern")
    const {internSchool} = await inquirer.prompt({
      type:"input",
      name:"internSchool",
      message:"What is the Intern's School? (Required)",
      validate: officeNumberInput => {
        if (officeNumberInput) {
          return true;
        } else {
          console.log('You need to enter a Intern\'s School');
          return false;
        }
      }
    });
    return {employeeName, employeeID, employeeEmail, internSchool};
};

//Using IFE to make a async function to use await as well as simplify the code and make it readable
// this is the main function that will call everything else and its doesn't have to have a variable assigned 
// to the function call as we are not going to reuse this function call anywhere else. This is only called here.
(async () => {
  //Array to hold the records of all the team we would enter
  const employees = [];
  employees.push(await getManagerInfo().then(
    ({ employeeName, employeeID, employeeEmail, officeNumber}) =>
    new Manager(employeeName, employeeID, employeeEmail, officeNumber)
  ))

  // Setting Variable to false to get a condition to loop
  let shouldExit = false;
  
  //Loop where user can add more team members 
  while(!shouldExit){
    // Destructing and getting the role variable from the getNextRole function
    const {role} = await getNextRole();
    // using the above variable in a switch statement and do different push to the employees Array
    switch(role){
      case "Engineer":
        // we can use await here to return a promise as the whole function is an async func
        employees.push(await getEngineerInfo().then(
        ({employeeName, employeeID, employeeEmail, GitHub}) =>
        new Engineer(employeeName, employeeID, employeeEmail, GitHub)
      ));
        break;
      case "Intern":
        // we can use await here to return a promise as the whole function is an async func
        employees.push(await getInternInfo().then(
        ({employeeName, employeeID, employeeEmail, internSchool}) =>
        new Intern(employeeName, employeeID, employeeEmail, internSchool)
          ));
      break;
      case "All done building my Team":
        shouldExit = true;
        break;
    }
    }
    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist);
    }
    fs.writeFileSync(HTML, PageTemplate(employees));
  return employees;
})().then((employeeData) => {
  console.log(employeeData);
})
  .catch(err =>{
    console.log(err);
});