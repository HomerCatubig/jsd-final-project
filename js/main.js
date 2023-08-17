console.log('Hello from final project!', axios );

/* ----- Global Variables ----------- */
const PLAYER_BASE_URL = 'https://www.balldontlie.io/api/v1/players/';
const TEAM_BASE_URL = 'https://www.balldontlie.io/api/v1/teams/';
const searchPlayerContainer = document.querySelector('#searchPResults');
const searchPlayerNode = document.querySelector('#searchPForm');
const playerSearchInput = document.querySelector('#searchPlayer');
const resultsParent = document.querySelector('#searchPResults');
const allPlayersNode = document.querySelector('#allPlayers');
const allTeamsNode = document.querySelector('#allTeams');
const teamSearchInput = document.querySelector('#searchTeam');
const resultsTeamParent = document.querySelector('#searchTResults');

/* ---------------------------------------------- */

/* --- PLAYERS --- */
// Perform a search when the user submits a form
searchPlayerNode.addEventListener('submit', ev => {
    console.log('Form submitted!');
    console.log(playerSearchInput.value);
    ev.preventDefault(); // Stop the form submit from reloading the page

    resultsParent.replaceChildren();
    loadSearchResults(playerSearchInput.value); // Give the user's input text to AJAX function
});

const loadSearchResults = (searchPlayer) => {

    axios.get(PLAYER_BASE_URL, {
        params: {
            search: searchPlayer,
        }
    })
    .then(res => {
        console.log('Response:', res.data);
        // console.log(res);

        // Generate DIV for each output
        res.data.data.forEach(player => {
            const divTag = document.createElement('div');
            divTag.innerHTML = `
            <img class="card" src="images/2kCard.jpg" id=logo alt="Player Card" />
            <h2 class="firstName">${player.first_name}</h2>
            <h2 class="lastName">${player.last_name}</h2>
            <p class="stats"><b>Player information:</b></p>
            <p class="stats"><b>Position:</b> ${player.position === '' ? "-" : player.position }</p>
            <p class="stats"><b>Height:</b> ${player.height_feet === null ? "-" : player.height_feet} ft ${player.height_inches === null ? "-" : player.height_inches} in</p>
            <p class="stats"><b>Team:</b> ${player.team.full_name}</p>
            `;

            divTag.className = 'playerRes';

            resultsParent.appendChild(divTag); 
        });
    })
    .catch(err => {
        console.warn('Error loading search results:', err);
    });
}

/* --- TEAMS --- */
// Load all teams when the "TEAMS" link is clicked
allTeamsNode.addEventListener('click', ev => {
    console.log('Form submitted!');
    console.log(teamSearchInput.value);
    ev.preventDefault(); // Stop the form submit from reloading the page

    resultsParent.replaceChildren();
    allTeamsResults(teamSearchInput.value); // Give the user's input text to AJAX function
});

const allTeamsResults = () => {
    axios.get(TEAM_BASE_URL)
    .then(res1 => {
        console.log('Response:', res1.data);
        // console.log(res);

        // Generate DIV for each output
        res1.data.data.forEach(team => {
            const divTag = document.createElement('div');
            divTag.innerHTML = `
            <img class="card" src="images/2kCard.jpg" id=logo alt="Team Card" />
            <p class="team"><b></b> ${team.name}</p>
            <p class="teamFN"><b>${team.full_name}</b></p>
            <p class="teamInfo"><b>City:</b> ${team.city}</p>
            <p class="teamInfo"><b>Conference:</b> ${team.conference}</p>
            <p class="teamInfo"><b>Division:</b> ${team.division}</p>
            <p class="abrv"><b>${team.abbreviation}</b></p>
            `;

            divTag.className = 'teamRes';

            resultsTeamParent.appendChild(divTag); 
        });
    })
    .catch(err => {
        console.warn('Error loading search results:', err);
    });
}
