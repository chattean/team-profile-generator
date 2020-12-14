const Employee = require("../lib/__mocks__/Employee");


// create the projects section
const generateTeamMembers = EmployeesArr => {
    return `
      <section class="my-3" id="team-member">
        <div class="flex-row justify-space-between">
        ${EmployeesArr
            .filter(({ role }) => 'Manager')
            .map(({ name, role, id, email, office }) => {
            return `
            <p>${name} <\p>
            <p>${role} <\p>
            <p>${id} <\p>
            <p>${email} <\p>
            <p>${office} <\p>`
        })}
        </div>
      </section>
    `;
  };

  
module.exports = EmployeesArr => {
    const{...teamMember} = teamMember;
    return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Team profile Generator</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header>
      <div class="container flex-row justify-space-between align-center py-3">
        <h1 class="page-title text-secondary bg-dark py-2 px-3">My Team</h1>
      </div>
    </header>
    <main class="container my-5">
      ${generateTeamMembers(teamMember)}
    </main>
    <footer class="container text-center py-3">
      <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h3>
    </footer>
  </body>
  </html>
  `;
};