const btnGetInfo = document.querySelector('#btn_get_info');
const btnAllPlanets = document.querySelector('#btn_allPlanets');
let urlPlanets = 'https://swapi.dev/api/planets/';
let Num = document.querySelector('.input');

async function getAllPlanets() {
  try {
    document.querySelector('#content').innerHTML = `<span id="loading">I'm looking for...</span>`;

    let promisePlanets = await fetch(urlPlanets, {
      method: 'GET',
    });
    let jsonPlanets = await promisePlanets.json();
    displayPlanets(jsonPlanets.results);

    let buttonPrevious = createButton('button_nav', 'previous');
    let buttonNext = createButton('button_nav', 'next');

    !jsonPlanets.previous
      ? (buttonPrevious.style.display = 'none')
      : (buttonNext.style.visible = 'visible') &&
        buttonPrevious.addEventListener('click', () => {
          urlPlanets = jsonPlanets.previous;
          getAllPlanets();
        });
    !jsonPlanets.next
      ? (buttonNext.style.display = 'none')
      : (buttonNext.style.visible = 'visible') &&
        buttonNext.addEventListener('click', () => {
          urlPlanets = jsonPlanets.next;
          getAllPlanets();
        });
  } catch (err) {
    alert(err);
  }
}
function displayPlanets(arr) {
  document.querySelector('#content').innerHTML = '';
  arr.forEach((el) => {
    createDiv('planet').innerHTML = el.name;
  });
}

async function getInfo() {
  try {
    document.querySelector('#content').innerHTML = `<span id="loading">I'm looking for...</span>`;
    let promiseFilm = await fetch(`https://swapi.dev/api/films/${Num.value}`, {
      method: 'GET',
    });
    let jsonFilm = await promiseFilm.json();
    let promisePeople = [];
    let jsonPeople = [];
    for (let i = 0; i < jsonFilm.characters.length; i++) {
      promisePeople[i] = await fetch(jsonFilm.characters[i]);
      jsonPeople[i] = await promisePeople[i].json();
    }
    displayInfo(jsonPeople);
  } catch (err) {
    alert(err);
  }
}
function displayInfo(arr) {
  document.querySelector('#content').innerHTML = '';
  arr.forEach((el) => {
    if (el.gender.toLowerCase() == 'male') {
      el.gender = '👨';
    } else if (el.gender.toLowerCase() == 'female') {
      el.gender = '👩';
    } else {
      el.gender = '👽';
    }
    createDiv('infoCharacter').innerHTML = el.name + ', ' + el.birth_year + ', ' + el.gender;
  });
}

function createDiv(className) {
  let div = document.createElement('div');
  document.querySelector('#content').append(div);
  div.classList.add(className);
  return div;
}

function createButton(className, html) {
  let button = document.createElement('button');
  document.querySelector('#content').append(button);
  button.classList.add(className);
  button.innerHTML = html;
  return button;
}

btnGetInfo.onclick = getInfo;
btnAllPlanets.onclick = getAllPlanets;
