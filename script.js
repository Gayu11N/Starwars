let currentCharacters = [];

// DOM Elements
const grid = document.getElementById('character-grid');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');

// English names to assign to the first 6 characters
const specificNames = ["Joy", "Alex", "Sam", "Charlie", "Max", "Taylor"];

document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters('https://swapi.dev/api/people/');
});

async function fetchCharacters(url) {
    loader.classList.remove('d-none');
    errorMessage.classList.add('d-none');
    grid.innerHTML = '';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Take just 6 characters and give them the specific English names
        currentCharacters = data.results.slice(0, 6).map((character, index) => {
            return {
                ...character,
                originalName: character.name,
                name: specificNames[index] || character.name
            };
        });
        
        createCharacterCards(currentCharacters);
        
    } catch (error) {
        console.error("Error fetching characters:", error);
        errorMessage.classList.remove('d-none');
    } finally {
        loader.classList.add('d-none');
    }
}

function createCharacterCards(characters) {
    grid.innerHTML = ''; 

    characters.forEach((character, index) => {
        // Use seed to get consistent image
        const imageSeed = character.name.replace(/\s+/g, '').toLowerCase();
        const randomImageUrl = `https://picsum.photos/seed/${imageSeed}/400/500`;
        
        const col = document.createElement('div');
        col.className = 'col h-100';

        col.innerHTML = `
            <div class="card simple-card" onclick="showCharacterModal(${index})">
                <div class="card-img-wrapper">
                    <img src="${randomImageUrl}" alt="${character.name}" loading="lazy">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${character.name}</h5>
                </div>
            </div>
        `;
        
        grid.appendChild(col);
    });
}

function showCharacterModal(index) {
    const character = currentCharacters[index];
    
    document.getElementById('characterModalLabel').innerText = character.name;
    
    let heightStr = 'Unknown';
    if (character.height && character.height !== 'unknown') {
        const heightMeters = (parseInt(character.height) / 100).toFixed(2);
        heightStr = `${heightMeters} m`;
    }
    
    document.getElementById('modal-height').innerText = heightStr;
    document.getElementById('modal-mass').innerText = (character.mass && character.mass !== 'unknown') ? `${character.mass} kg` : 'Unknown';
    document.getElementById('modal-birth').innerText = character.birth_year || 'Unknown';
    
    if (character.created) {
        const createdDate = new Date(character.created);
        const day = String(createdDate.getDate()).padStart(2, '0');
        const month = String(createdDate.getMonth() + 1).padStart(2, '0');
        const year = createdDate.getFullYear();
        document.getElementById('modal-added').innerText = `${day}-${month}-${year}`;
    } else {
        document.getElementById('modal-added').innerText = 'Unknown';
    }
    
    document.getElementById('modal-loader').classList.remove('d-none');
    document.getElementById('modal-content').classList.add('d-none');
    
    const modalElement = document.getElementById('characterModal');
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
    modalInstance.show();
    
    if (character.homeworld) {
        fetchHomeworld(character.homeworld);
    } else {
        updateHomeworldUI('Unknown', 'Unknown', 'Unknown', 'Unknown');
        document.getElementById('modal-loader').classList.add('d-none');
        document.getElementById('modal-content').classList.remove('d-none');
    }
}

async function fetchHomeworld(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch homeworld');
        
        const planet = await response.json();
        let populationStr = planet.population;
        if (populationStr !== 'unknown') {
            populationStr = parseInt(populationStr).toLocaleString();
        }
        
        updateHomeworldUI(planet.name, planet.terrain, planet.climate, populationStr);
        
    } catch (error) {
        console.error("Error fetching homeworld:", error);
        updateHomeworldUI('Error loading', 'Error loading', 'Error loading', 'Error loading');
    } finally {
        document.getElementById('modal-loader').classList.add('d-none');
        document.getElementById('modal-content').classList.remove('d-none');
    }
}

function updateHomeworldUI(name, terrain, climate, population) {
    document.getElementById('modal-planet').innerText = name || '-';
    document.getElementById('modal-population').innerText = population || '-';
    document.getElementById('modal-terrain').innerText = terrain || '-';
    document.getElementById('modal-climate').innerText = climate || '-';
}
