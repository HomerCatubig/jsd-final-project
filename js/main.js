console.log('Hello from final project!', axios );

const PLAYER_BASE_URL = 'https://www.balldontlie.io/api/v1/players/';

const searchPlayerContainer = document.querySelector('#searchPResults');
const searchPlayerNode = document.querySelector('#searchPForm');
const playerSearchInput = document.querySelector('#searchPlayer');

// Perform a search when the user submits a form
searchPlayerNode.addEventListener('submit', ev => {
    console.log('Form submitted!');
    console.log(playerSearchInput.value);
    ev.preventDefault(); // Stop the form submit from reloading the page

    searchPlayerContainer.replaceChildren();
    loadSearchResults(playerSearchInput.value); // Give the user's input text to AJAX function
});

const loadSearchResults = (searchPlayer) => {
    searchPlayerContainer.replaceChildren(); // Clear previous search results

    axios.get(PLAYER_BASE_URL, {
        params: {
            search: searchPlayer,
        }
    })
    .then(res => {
        // searchPlayerContainer.replaceChildren();
        // console.log('Response:', res.data);
        console.log(res);
        res.data.data.forEach(player => {
            const divTag = document.createElement('div');
            divTag.innerHTML = `
            <img class="card" src="images/2kCard.png" id=logo alt="Player Card" />
            <h2 class="firstName">${player.first_name}</h2>
            <h2 class="lastName">${player.last_name}</h2>
            <p>${player.position}</p>
            `;

            divTag.className = 'playerRes';

            const resultsParent = document.querySelector('#searchPResults');
            document.body.appendChild(divTag); 
        });
    })
    .catch(err => {
        console.warn('Error loading search results:', err);
    });
}

// "ternary" operator
