// setPage(); 


// function setPage() {
//     getWeaponNames(); 
// }

// // function to show details of animal upon being clicking
// function toggleWeaponDescription() {
//     let description = document.querySelectorAll('.description');
//     let title = document.querySelectorAll('.title');
//     let weaponIndex;

//     title.forEach((element, index) => {
//         element.addEventListener('click', () => {
//             if (weaponIndex >= 0) {
//                 description[weaponIndex].style.display = "none";
//                 title[weaponIndex].classList.remove("active");
//                 title[weaponIndex].parentElement.classList.remove("active");
//             }
//             weaponIndex = index;
//             description[index].style.display = "block";
//             element.classList.add('active');
//             element.parentElement.classList.add('active');
//         })
//     })
// }


// function submitVoteBtn() {
//     const btn = document.querySelectorAll('button');
//     const votesCount = document.querySelectorAll('.description p span');
//     btn.forEach((element, btnindex) => {
//         element.addEventListener('click', () => {
//             votesCount.forEach((element, voteindex) => {
//                 if (btnindex == voteindex) {
//                     let voteId = btn[btnindex].dataset.id;
//                     let numVotes = parseInt(element.textContent) + 1;
//                     element.textContent = numVotes;
//                     addVote(voteId, numVotes);
//                 }
//             })
//         })
//     })
// }


// function addVote(id, number) {
//     fetch(`http://localhost:3000/results/${id}`, {
//         method: 'PATCH',
//         body: JSON.stringify(
//             {
//                 "votes": number
//             }
//         ),
//         headers: {
//             'Content-type': 'application/json'
//         }
//     })
//         .then(res => res.json())
//         .then(res => {
//             console.log(res);
//         })
//         .catch(err => console.log(err.message));
// }


// async function getWeaponNames() {
//     const weaponNames = document.querySelector('.weaponNames');
//     let output = '';

//     await fetch('http://localhost:3000')
//         .then(res => res.json())
//         .then(res => {
//             res.forEach(element => { 
//                 output += ` <div class="singleWeapon">
//                 <p class="title">${element.name}</p>
//                 <div class="description">
//                     <img src="${element.image}" alt="">
                    
//                     <p>Votes: <span>${element.votes}</span></p>
//                     <button data-id=${element.id}>Add Vote</button>
//                 </div>
//                 </div>`
//             });

//             weaponNames.innerHTML = output;
//         })
//         .catch(err => console.log(err.message));
    
//     toggleWeaponDescription();
//     submitVoteBtn();
// }


// const resetButton = document.getElementById('resetButton');

// resetButton.addEventListener('click', () => {
//   const votesCount = document.querySelectorAll('.description p span');
//   votesCount.forEach((element) => {
//     element.textContent = '0';
//   });
// });

// const names = document.getElementById('names')
const weaponsContainer = document.getElementById('weapons-container')

const resetBtn = document.createElement('button')
resetBtn.textContent = 'Reset votes'
resetBtn.addEventListener('click', () => {
  document.querySelectorAll('.votes-count').forEach(votesCount => {
    votesCount.textContent = '0 votes'
  })
})

weaponsContainer.append(resetBtn)
fetch('https://api.open5e.com/weapons/').then(res => res.json()).then(res => {
    // console.log(res.results)
    res.results.forEach(weapon => {
 
        // const h4 = document.createElement('h4')
        // h4.textContent = weapon.name
        // names.append(h4)

        const names = document.createElement('div')

        // create vote button
        const voteBtn = document.createElement('button')
        const votesCount = document.createElement('span')
        voteBtn.className = 'vote-btn'
        voteBtn.textContent = 'Vote'
        votesCount.className = 'votes-count'
        votesCount.textContent = '0 votes'

        names.className = 'names'
        names.id = 'names'
        names.innerHTML = `
         <h4>${weapon.name}</h4>
                <p>${weapon.category}</p>
                <a href=${weapon.weight} target="_blank" rel="noopener noreferrer">${weapon.weight}</a>
                <span>${weapon.cost}</span><span class="votes-count">0</span> votes</span>

                `
        names.append(voteBtn,votesCount)

                weaponsContainer.append(names)

                // vote click event
                let voteCount = 0
                voteBtn.addEventListener('click', () => {
                     voteCount++
                      votesCount.textContent = `${voteCount} vote${voteCount !== 1 ? 's' : ''}`
                })
       
                
               
     
              
  })
}

    );






// const resetButton = document.getElementById('resetButton');

// resetButton.addEventListener('click', () => {
//   const votesCount = document.querySelectorAll('.description p span');
//   votesCount.forEach((element) => {
//     element.textContent = '0';
//   });
// });
