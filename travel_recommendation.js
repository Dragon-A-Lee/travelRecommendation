document.addEventListener('DOMContentLoaded', () => {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            window.travelData = data;
            console.log('Travel data:', data); // Check if data is fetched correctly
        })
        .catch(error => console.error('Error fetching travel data:', error));
});

function executeSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (window.travelData && query) {
        const normalizedQuery = normalizeQuery(query);

        // Check for matches in countries
        if (window.travelData.countries) {
            const countryMatches = window.travelData.countries.filter(country =>
                normalizeQuery(country.name).includes(normalizedQuery)
            );
            if (countryMatches.length > 0) {
                displayResults(countryMatches);
            }
        }

        // Check for matches in temples
        if (window.travelData.temples) {
            const templeMatches = window.travelData.temples.filter(temple =>
                normalizeQuery(temple.name).includes(normalizedQuery)
            );
            if (templeMatches.length > 0) {
                displayResults(templeMatches);
            }
        }

        // Check for matches in beaches
        if (window.travelData.beaches) {
            const beachMatches = window.travelData.beaches.filter(beach =>
                normalizeQuery(beach.name).includes(normalizedQuery)
            );
            if (beachMatches.length > 0) {
                displayResults(beachMatches);
            }
        }

        if (resultsContainer.innerHTML === '') {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    }
}

function resetSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
}

function normalizeQuery(query) {
    query = query.toLowerCase();
    if (query.endsWith('es')) {
        query = query.slice(0, -2);
    } else if (query.endsWith('s')) {
        query = query.slice(0, -1);
    }
    return query;
}

function displayResults(matches) {
    const resultsContainer = document.getElementById('results');

    matches.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <h3>${item.name}</h3>
            <img src="images/${item.imageUrl}" alt="${item.name}">
            <p>${item.description}</p>
        `;
        resultsContainer.appendChild(resultItem);
    });
}


function resetSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
}
function executeSearch() {
    const searchQuery = document.querySelector('.search-container input').value;
    alert('Search for: ' + searchQuery);
    // Implement your search logic here
}

function resetSearch() {
    document.querySelector('.search-container input').value = '';
    alert('Search reset.');
    // Implement your reset logic here
}