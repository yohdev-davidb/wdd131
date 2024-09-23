
const currentYear = new Date().getFullYear();

const lastModified = document.lastModified;

document.querySelector('footer p:nth-child(1)').innerHTML = `&copy; ${currentYear} Dave Brooke - Statesville`;

document.querySelector('footer p:nth-child(2)').innerHTML = `Last Modification: ${lastModified}`;