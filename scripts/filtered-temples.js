const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake Temple",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253000,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-53926.jpg"
    },
    {
        templeName: "Provo City Center",
        location: "Provo, Utah, United States",
        dedicated: "2016, March, 20",
        area: 85000,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/provo-city-center-temple/provo-city-center-temple-11074.jpg"
    },
    {
        templeName: "Hong Kong China",
        location: "Hong Kong, China",
        dedicated: "1996, May, 26",
        area: 21000,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/hong-kong-china-temple/hong-kong-china-temple-28220.jpg"
    },
];

const navLinks = document.querySelectorAll('nav ul li a');
const mainTitle = document.querySelector('main h1');
const imageGrid = document.querySelector('.image-grid');

// Function to render temples
function renderTemples(templesToRender) {
    // Clear the imageGrid
    imageGrid.innerHTML = '';

    // Loop through templesToRender array
    templesToRender.forEach(temple => {
        // Create elements
        const card = document.createElement('div');
        card.classList.add('temple-card');

        const templeName = document.createElement('h2');
        templeName.textContent = temple.templeName;

        const location = document.createElement('p');
        location.textContent = 'Location: ' + temple.location;

        const dedicated = document.createElement('p');
        dedicated.textContent = 'Dedicated: ' + temple.dedicated;

        const area = document.createElement('p');
        area.textContent = 'Area: ' + temple.area + ' sq ft';

        const image = document.createElement('img');
        image.src = temple.imageUrl;
        image.alt = temple.templeName;
        image.loading = 'lazy';

        // Append elements
        card.appendChild(templeName);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);
        card.appendChild(image);

        imageGrid.appendChild(card);
    });
}

// Initial render of all temples
renderTemples(temples);

navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default link behavior

        navLinks.forEach(item => item.classList.remove('active'));

        this.classList.add('active');

        // Get the filter type
        const filterType = this.textContent.trim().toLowerCase();

        // Filter the temples based on filterType
        let filteredTemples;

        if (filterType === 'home') {
            filteredTemples = temples;
        } else if (filterType === 'old') {
            filteredTemples = temples.filter(temple => {
                const dedicatedYear = parseInt(temple.dedicated.split(',')[0]);
                return dedicatedYear < 1900;
            });
        } else if (filterType === 'new') {
            filteredTemples = temples.filter(temple => {
                const dedicatedYear = parseInt(temple.dedicated.split(',')[0]);
                return dedicatedYear > 2000;
            });
        } else if (filterType === 'large') {
            filteredTemples = temples.filter(temple => temple.area > 90000);
        } else if (filterType === 'small') {
            filteredTemples = temples.filter(temple => temple.area < 10000);
        } else {
            filteredTemples = temples;
        }

        // Render the filtered temples
        renderTemples(filteredTemples);

        // Update the main h1 title
        mainTitle.textContent = this.textContent;

    });
});

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Update the footer copyright year
const currentYear = new Date().getFullYear();
const copyright = document.getElementById('copyright');

copyright.innerHTML = `&copy; ${currentYear} Dave Brooke - Statesville`;

// Update the last modified date
document.getElementById("lastModified").textContent = new Date(document.lastModified).toLocaleDateString();