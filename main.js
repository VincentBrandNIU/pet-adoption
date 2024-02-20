const template = document.querySelector("#pet-card-template");
const wrapper = document.createDocumentFragment();


async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast");
  const weatherData = await weatherPromise.json();

  const ourTemp = weatherData.properties.periods[0].temperature;
  document.querySelector("#temperature").textContent = ourTemp;
}

//start();

async function petsArea() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json");
  const petsData = await petsPromise.json();
  //console.log(petsData);
  petsData.forEach(element => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".pet-card").dataset.species = element.species;
    clone.querySelector("h3").textContent = element.name;
    clone.querySelector(".pet-description").textContent = element.description;
    clone.querySelector(".pet-age").textContent = createAgeText(element.birthYear);

    if (!element.photo) element.photo = "images/Fallback.jpg";
    clone.querySelector(".pet-card-photo img").src = element.photo;
    clone.querySelector(".pet-card-photo img").alt = `Photo of a ${element.species} named ${element.name}`;
    wrapper.appendChild(clone);
  });
  document.querySelector(".list-of-pets").appendChild(wrapper);
}

petsArea();

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (age == 1) return "1 year old";
  if (age == 0) return "Less than a year old";
  return `${age} years old`;
}
const allButtons = document.querySelectorAll(".pet-filter button")
// Pet filter button code
allButtons.forEach(el => {
  el.addEventListener("click", handleButtonClick)
})


function handleButtonClick(e) {
  //remove active class
  allButtons.forEach(el => el.classList.remove("active"));
  //add active class
  e.target.classList.add("active");
  //filter pets
  const currentFilter = e.target.dataset.filter;
  document.querySelectorAll(".pet-card").forEach(el => {
    if (currentFilter == el.dataset.species || currentFilter == "all") {
      el.style.display = "grid";
    } else {
      el.style.display = "none";
    }
  })
}