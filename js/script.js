// **Consegna:**
// Dato un array contenente una lista di cinque immagini, creare un carosello come nello screenshot allegato.

// **MILESTONE 1**
// Per prima cosa, creiamo il markup statico: costruiamo il container e inseriamo un'immagine grande al centro: avremo così la struttura base e gli stili pronti per poterci poi concentrare solamente sull'aspetto logico.

// **MILESTONE 2**
// Adesso rimuoviamo tutto il markup statico e inseriamo tutte le immagini dinamicamente servendoci dell'array fornito e un semplice ciclo for che concatena un template literal.
// Tutte le immagini saranno nascoste, tranne la prima, che avrà una classe specifica che la renderà visibile.
// // Al termine di questa fase ci ritroveremo con lo stesso slider stilato nella milestone 1, ma costruito dinamicamente attraverso JavaScript.

// // **MILESTONE 3**
// // Al click dell'utente sulle frecce, il programma cambierà l’immagine attiva, che quindi verrà visualizzata al posto della precedente.

const images = [
  {
    image: 'img/01.webp',
    title: 'Marvel\'s Spiderman Miles Morale',
    text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
  }, {
    image: 'img/02.webp',
    title: 'Ratchet & Clank: Rift Apart',
    text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
  }, {
    image: 'img/03.webp',
    title: 'Fortnite',
    text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
  }, {
    image: 'img/04.webp',
    title: 'Stray',
    text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
  }, {
    image: 'img/05.webp',
    title: "Marvel's Avengers",
    text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
  }
];
const itemsContainer = document.querySelector(".slider-items");
const itemsArray = document.getElementsByClassName("item");
const thumbnailsContainer = document.querySelector(".thumbnails");
const thumbnailsArray = document.getElementsByClassName("thumbnail");
let activeItemIndex = 0;

for (let i = 0; i < images.length; i++) {
  const currentImage = images[i];
  const sliderItem = `
     <div class="item">
       <img src="${currentImage.image}" alt="">
        <div class="text">
          <h2 class="title">${currentImage.title}</h2>
          <h4 class="description">${currentImage.text}</h4>
        </div>
     </div>`;
  const thumbnailItem = `
     <div class="thumbnail">
       <img src="${currentImage.image}" alt="">
     </div>`;

  itemsContainer.innerHTML += sliderItem;
  thumbnailsContainer.innerHTML += thumbnailItem;
}

itemsArray[activeItemIndex].classList.add("active");
thumbnailsArray[activeItemIndex].classList.add("active-thumbnail");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

prevBtn.addEventListener("click", function () {

  itemsArray[activeItemIndex].classList.remove("active");

  thumbnailsArray[activeItemIndex].classList.remove("active-thumbnail");

  activeItemIndex--;

  if (activeItemIndex === -1) {
    activeItemIndex = itemsArray.length - 1;
  }

  itemsArray[activeItemIndex].classList.add("active");
  thumbnailsArray[activeItemIndex].classList.add("active-thumbnail");
});

nextBtn.addEventListener("click", function () {

  itemsArray[activeItemIndex].classList.remove("active");

  thumbnailsArray[activeItemIndex].classList.remove("active-thumbnail");

  activeItemIndex++;

  if (activeItemIndex === itemsArray.length) {
    activeItemIndex = 0;
  }

  itemsArray[activeItemIndex].classList.add("active");
  thumbnailsArray[activeItemIndex].classList.add("active-thumbnail");
});


itemsContainer.addEventListener("mouseenter", stopAutoplay);
itemsContainer.addEventListener("touchstart", stopAutoplay);


itemsContainer.addEventListener("mouseleave", startAutoplay);
itemsContainer.addEventListener("touchend", startAutoplay);



const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const reverseBtn = document.getElementById("reverseBtn");


startBtn.addEventListener("click", startAutoplay);
stopBtn.addEventListener("click", stopAutoplay);
reverseBtn.addEventListener("click", reverseAutoplay);


let autoplayDirection = 1; 
let autoplayInterval = setInterval(autoSlide, 3000)

function startAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(autoSlide, 3000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

function reverseAutoplay() {
  autoplayDirection = -autoplayDirection;
  clearInterval(autoplayInterval);
  autoplayInterval = setInterval(autoSlide, 3000);
}

function autoSlide() {
  itemsArray[activeItemIndex].classList.remove("active");
  thumbnailsArray[activeItemIndex].classList.remove("active-thumbnail");

  activeItemIndex += autoplayDirection;

  if (activeItemIndex === itemsArray.length) {
    activeItemIndex = 0;
  } else if (activeItemIndex < 0) {
    activeItemIndex = itemsArray.length - 1;
  }

  itemsArray[activeItemIndex].classList.add("active");
  thumbnailsArray[activeItemIndex].classList.add("active-thumbnail");
}
