// const Employee = require("../lib/__mocks__/Employee");


// create the projects section
const generateTeamMembers = EmployeesArr => {

  const generateManager = manager => {
    return `
    <div class="col-sm-3">
    <div class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header">
        <h2 class="card-title">${manager.getName()} <\h2>
        <h3><i class="fas fa-mug-hot mr-2"></i>${manager.getRole()} <\h3>
      </div>
      <div class="card-body">
        <h5 class="card-title">${manager.getRole()} Details:</h5>
            <p class="card-text">Employee ID: ${manager.getId()} <\p>
            <p class="card-text">Email : <a class="card-link" href="mailto:${manager.getEmail()}"> ${manager.getEmail()}</a><\p>
            <p class="card-text">Office Number: ${manager.getOfficeNumber()} <\p>
      </div>
    </div>
    </div>
    `;
  };
  const generateEngineer = engineer => {
    return `
    <div class="col-sm-3">
    <div class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header">
        <h2 class="card-title">${engineer.getName()} <\h2>
        <h3><i class="fas fa-glasses mr-2"></i>${engineer.getRole()} <\h3>
      </div>
      <div class="card-body">
        <h5 class="card-title">${engineer.getRole()} Details:</h5>
            <p class="card-text">Employee ID: ${engineer.getId()} <\p>
            <p class="card-text">Email : <a class="card-link" href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a><\p>
            <p class="card-text">GitHub ID: <a class="card-link" href="https://github.com/${engineer.getGitHub()}" target="_blank">${engineer.getGitHub()}</a><\p>
      </div>
    </div>
    </div>
    `;
  };

  const generateIntern = intern => {
    return `
    <div class="col-sm-3">
    <div class="card bg-light mb-3" style="max-width: 18rem;">
    <div class="card-header">
      <h2 class="card-title">${intern.getName()} <\h2>
      <h3><i class="fas fa-user-graduate mr-2"></i>${intern.getRole()} <\h3>
    </div>
    <div class="card-body">
      <h5 class="card-title">Intern Details</h5>
          <p class="card-text">Employee ID: ${intern.getId()} <\p>
          <p class="card-text">Email :<a class="card-link" href="mailto:${intern.getEmail()}">${intern.getEmail()}</a><\p>
          <p class="card-text">School : ${intern.getSchool()} <\p>
    </div>
  </div>
  </div>
    `;

  }
  const html = [];

  html.push(EmployeesArr
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => generateManager(manager))
  );
  html.push(EmployeesArr
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => generateEngineer(engineer))
  );
  html.push(EmployeesArr
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => generateIntern(intern))
  );
  return html.join("");
}
module.exports = EmployeesArr => {
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Team profile Generator</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <script src="https://kit.fontawesome.com/eebaf263a5.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header>
      <div class="container justify-space-between align-center">
        <h1 class="page-title text-secondary bg-dark py-2 px-3">My Team</h1>
      </div>
    </header>
    <div class="container">
      <div class ="row">
        <div class="col-12 justify-content-center">
          ${generateTeamMembers(EmployeesArr)}
        </div>
      </div>
    </div>
    <footer class="container text-center py-3">
      <h3 class="text-dark">&copy; ${new Date().getFullYear()} by Anuj Chatterjee </h3>
    </footer>
  </body>
  </html>
  `;
};