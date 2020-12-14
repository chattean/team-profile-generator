const inquirer = require('inquirer');
//requiring constructors
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const generatePage = require('./src/page-template');
const {writeFile} = require('./utils/generate-site');



//Array to hold the records of all the team we would enter
const teamMembers = [];


const getNextRole = () => {
 return inquirer.prompt(
    {
      type:"list",
      name:"role",
      message:`Which role would you like to add?`,
      choices: ["Engineer", "Intern", "All done building my Team"] 
    }
  )};


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

const getEngineerInfo =  async () => {
  const {employeeName, employeeID, employeeEmail} = await getEmployeeInfo("Engineer")
    const {github} = await inquirer.prompt({
      type:"input",
      name:"github",
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
    return {employeeName, employeeID, employeeEmail, github};
};

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
// this is the main function that will call everthing else
(async () => {
  // Creating an array of employees
  const employees = [];
  // const managerInfo = await getMangerInfo();
  employees.push(await getManagerInfo().then(
    ({ employeeName, employeeID, employeeEmail, officeNumber}) =>
    new Manager(employeeName, employeeID, employeeEmail, officeNumber)
  ))

  let shouldExit = false;

  while(!shouldExit){

    const {role} = await getNextRole();
    switch(role){
      case "Engineer":
        employees.push(await getEngineerInfo().then(
        ({employeeName, employeeID, employeeEmail, github}) =>
        new Engineer(employeeName, employeeID, employeeEmail, github)
      ));
        break;
      case "Intern":
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

  

  
  //generate html
  //write html
  return employees;
})().then((employeeData) => {
  console.log(employeeData);
});

    

//       .then(employeeData => {
//         employeeData.push(employeeData);
//         // if (employeeData.confirmAddployee) {
//         //   return promptEmployee(employeeData, );
//         // } else {
//           return employeeData; 
//       });
// };

//   promptEmployee()
//     .then(employeeData => {
//         console.log(employeeData);
//         return generatePage(employeeData);
//     })
//     .then(employeePage => {
//         return writeFile(employeePage);
//     })    
//     .catch(err =>{
//     console.log(err);
//     });
// // promptEmployee
// //   .then((employeeData, 'Manager') => {
// //       console.log(employeeData,employeeRole)
// //   }

// //   const promptEngineer = (employeeData, employeeRole) =>{}
