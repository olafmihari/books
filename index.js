const weaponsContainer = document.getElementById('weapons-container');
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');

const resetBtn = document.createElement('button');
resetBtn.textContent = 'Reset votes';
resetBtn.addEventListener('click', () => {
  document.querySelectorAll('.votes-count').forEach(votesCount => {
    votesCount.textContent = '0 votes';
  });
});

weaponsContainer.append(resetBtn);

fetch('https://api.open5e.com/weapons/').then(res => res.json()).then(res => {
  res.results.forEach(weapon => {
    const names = document.createElement('div');
    const voteBtn = document.createElement('button');
    const votesCount = document.createElement('span');
    voteBtn.className = 'vote-btn';
    voteBtn.textContent = 'Vote';
    votesCount.className = 'votes-count';
    votesCount.textContent = '0 votes';

    names.className = 'names';
    names.id = 'names';
    names.innerHTML = `
      <h4>${weapon.name}</h4>
      <p>${weapon.category}</p>
      <a href=${weapon.weight} target="_blank" rel="noopener noreferrer">${weapon.weight}</a>
      <span>${weapon.cost}</span>
      <span class="votes-count">0</span> votes
    `;
    names.append(voteBtn,votesCount);

    weaponsContainer.append(names);

    let voteCount = 0;
    voteBtn.addEventListener('click', () => {
      voteCount++;
      votesCount.textContent = `${voteCount} vote${voteCount !== 1 ? 's' : ''}`;
    });
  });

  // Search function
  const searchWeapons = () => {
    const searchTerm = searchBar.value.toLowerCase();
    const names = document.querySelectorAll('.names');
    names.forEach(name => {
      const weaponName = name.querySelector('h4').textContent.toLowerCase();
      if (weaponName.includes(searchTerm)) {
        name.style.display = 'block';
      } else {
        name.style.display = 'none';
      }
    });
  };

  // Add event listener to search button
  searchBtn.addEventListener('click', searchWeapons);
});


