console.log('Hello from final project!', axios );

const PLAYER_BASE_URL = 'https://www.balldontlie.io/api/v1/players/';

const searchPlayerContainer = document.querySelector('#searchPResults');
const searchPlayerNode = document.querySelector('#searchPForm');
const playerSearchInput = document.querySelector('#searchPlayer');

searchPlayerNode.addEventListener('submit', ev => {
    console.log('Form submitted!');
    ev.preventDefault();

    searchPlayerContainer.replaceChildren();
    loadSearchResults(playerSearchInput.value);
    
});

const loadSearchResults = (searchPlayer) => {
    searchPlayerContainer.replaceChildren();

    axios.get(PLAYER_BASE_URL, {
        params: {
            search: searchPlayer,
        }
    })
    .then(res => {
        searchPlayerContainer.replaceChildren();
        console.log('Response:', res.data);

        res.data.results.forEach(player => {
            const divTag = document.createElement('div');
            divTag.innerHTML = `
            <h2>${player.first_name} ${player.last_name}</h2>
            `;

            divTag.className = 'result'

            const resultsParent = document.querySelector('#searchPResults');
            document.body.appendChild(divTag);
//             <div class="card">
//   <img src="img_avatar.png" alt="Avatar" style="width:100%">
//   <div class="container">
//     <h4><b>John Doe</b></h4> 
//     <p>Architect & Engineer</p> 
//   </div>
// </div>
            
        });

    })
    .catch()
}


