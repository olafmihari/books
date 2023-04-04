setPage(); 


function setPage() {
    getWeaponNames(); 
}

// function to show details of animal upon being clicking
function toggleWeaponDescription() {
    let description = document.querySelectorAll('.description');
    let title = document.querySelectorAll('.title');
    let weaponIndex;

    title.forEach((element, index) => {
        element.addEventListener('click', () => {
            if (weaponIndex >= 0) {
                description[weaponIndex].style.display = "none";
                title[weaponIndex].classList.remove("active");
                title[weaponIndex].parentElement.classList.remove("active");
            }
            weaponIndex = index;
            description[index].style.display = "block";
            element.classList.add('active');
            element.parentElement.classList.add('active');
        })
    })
}


function submitVoteBtn() {
    const btn = document.querySelectorAll('button');
    const votesCount = document.querySelectorAll('.description p span');
    btn.forEach((element, btnindex) => {
        element.addEventListener('click', () => {
            votesCount.forEach((element, voteindex) => {
                if (btnindex == voteindex) {
                    let voteId = btn[btnindex].dataset.id;
                    let numVotes = parseInt(element.textContent) + 1;
                    element.textContent = numVotes;
                    addVote(voteId, numVotes);
                }
            })
        })
    })
}


function addVote(id, number) {
    fetch(`http://localhost:3000/results/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(
            {
                "votes": number
            }
        ),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err.message));
}


async function getWeaponNames() {
    const weaponNames = document.querySelector('.weaponNames');
    let output = '';

    await fetch('http://localhost:3000')
        .then(res => res.json())
        .then(res => {
            res.forEach(element => { // For each "span" element, check if the index matches the button index. If it does, update the vote count and send the vote to the database
                output += ` <div class="singleWeapon">
                <p class="title">${element.name}</p>
                <div class="description">
                    <img src="${element.image}" alt="">
                    <thumbnail src="${element.thumbnail}" alt="">
                    <p>Votes: <span>${element.votes}</span></p>
                    <button data-id=${element.id}>Add Vote</button>
                </div>
                </div>`
            });

            weaponNames.innerHTML = output;
        })
        .catch(err => console.log(err.message));
    
    toggleWeaponDescription();
    submitVoteBtn();
}


const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', () => {
  const votesCount = document.querySelectorAll('.description p span');
  votesCount.forEach((element) => {
    element.textContent = '0';
  });
});