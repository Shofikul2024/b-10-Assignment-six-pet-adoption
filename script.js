console.log("hello");

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// load categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
// load all pets
const loadAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllPets(data.pets))
    .catch((error) => console.log(error));
};

// load category pets
const loadCategoryPets = (category) => {
  document.getElementById("spinner").style.display = "block";
  setTimeout(function () {
    document.getElementById("spinner").style.display = "none";
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${category}`);
        activeBtn.classList.add("active");
        displayAllPets(data.data);
      })
      .catch((error) => console.log(error));
  }, 2000);
};

// load pet details
const loadPetDetails = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayPetDetails(data.petData))
    .catch((error) => console.log(error));
};

// load pet Photos
const loadPetPhotos = (photos) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${photos}`)
    .then((res) => res.json())
    .then((data) => displayPetPhotos(data.petData.image))
    .catch((error) => console.log(error));
};

// countdown modal
const openModal = () => {
  my_modal_2.showModal();
  let countdown = 3;
  document.getElementById("countdownValue").innerText = countdown;

  const countdownInterval = setInterval(() => {
    countdown--;
    document.getElementById("countdownValue").innerText = countdown;
    if (countdown === 0) {
      clearInterval(countdownInterval);
      document.getElementById("close").click();
    }
  }, 1000);
};

// load pets sort by price
const loadShortPets = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  const petPrice = data.pets;
  // console.log(short);
  petPrice.sort((a, b) => b.price - a.price);
  console.log(petPrice);
  displayAllPets(petPrice);
};

// display pet photos
const displayPetPhotos = (photos) => {
  const petPhoto = document.getElementById("photos");
  const div = document.createElement("div");

  div.innerHTML = `
  <div class="p-3"><img class="rounded-lg" src="${photos}"></div>
  `;
  petPhoto.append(div);
};

 