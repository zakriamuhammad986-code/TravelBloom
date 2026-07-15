// =========================
// TravelBloom JavaScript
// =========================

// HTML Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const results = document.getElementById("recommendation-results");

// Store JSON data
let travelData = {};

// Fetch JSON
fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log("Travel Data Loaded");
        console.log(travelData);
    })
    .catch(error => console.log(error));

// Display Results
function displayResults(items) {

    results.innerHTML = "<h2 style='color:white;margin-bottom:20px;'>Search Results</h2>";

    items.forEach(item => {

        results.innerHTML += `
            <div class="card">

                <img src="${item.imageUrl}" alt="${item.name}">

                <h3>${item.name}</h3>

                <p>${item.description}</p>

                <button>Visit</button>

            </div>
        `;
    });

}

// Search Button
searchBtn.addEventListener("click", function () {

    const keyword = searchInput.value.toLowerCase().trim();

    // Beach Search
    if (keyword === "beach" || keyword === "beaches") {

        displayResults(travelData.beaches);
        return;
    }

    // Temple Search
    if (keyword === "temple" || keyword === "temples") {

        displayResults(travelData.temples);
        return;
    }

    // Country Search
    if (keyword === "country" || keyword === "countries") {

        let cities = [];

        travelData.countries.forEach(country => {
            cities = cities.concat(country.cities);
        });

        displayResults(cities);
        return;
    }

    // Search by Country Name
    let found = false;

    travelData.countries.forEach(country => {

        if (country.name.toLowerCase() === keyword) {

            displayResults(country.cities);
            found = true;
        }

    });

    // No Results
    if (!found) {

        results.innerHTML = `
            <h2 style="color:white;">
                No recommendations found.
            </h2>
        `;
    }

});

// Reset Button
resetBtn.addEventListener("click", function () {

    searchInput.value = "";

    results.innerHTML = "";

});
