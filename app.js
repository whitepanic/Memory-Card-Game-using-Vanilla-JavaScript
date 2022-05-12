// Grab a couple of things
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

// Link text
playerLivesCount.textContent = playerLives;

// Generate the data
// TODO Use https://source.unsplash.com/random
const getData = () => [
  { imgSrc: "./images/img1.png", name: "img1" },
  { imgSrc: "./images/img2.png", name: "img2" },
  { imgSrc: "./images/img3.png", name: "img3" },
  { imgSrc: "./images/img4.png", name: "img4" },
  { imgSrc: "./images/img5.png", name: "img5" },
  { imgSrc: "./images/img6.png", name: "img6" },
  { imgSrc: "./images/img7.png", name: "img7" },
  { imgSrc: "./images/img8.png", name: "img8" },
  { imgSrc: "./images/img1.png", name: "img1" },
  { imgSrc: "./images/img2.png", name: "img2" },
  { imgSrc: "./images/img3.png", name: "img3" },
  { imgSrc: "./images/img4.png", name: "img4" },
  { imgSrc: "./images/img5.png", name: "img5" },
  { imgSrc: "./images/img6.png", name: "img6" },
  { imgSrc: "./images/img7.png", name: "img7" },
  { imgSrc: "./images/img8.png", name: "img8" },
];

// Randomize
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

// Card Generator Function
const cardGenerator = () => {
  const cardData = randomize();
  //Generate the HTML
  cardData.forEach(item => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    // Attach the info to the cards
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    // Attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", e => {
      card.classList.toggle("toggleCard");
      checkCard(e);
    });
  });
};

// CheckCards
const checkCard = e => {
  console.log(e);
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  // Logic
  if (flippedCards.length === 2) {
    if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
      console.log("match");
      flippedCards.forEach(card => {
        card.classList.remove("flipped");
        card.getElementsByClassName.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCards.forEach(card => {
        card.classList.remove("flipped");
        setTimeout(() => {
          card.classList.remove("toggleCard");
        }, 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("Try again");
      }
    }
  }
  // Run a check to see if we won the game
  if (flippedCards.length === 16) {
    restart("You won!");
  }
};

// Restart
const restart = text => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    //Randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });
  playerLives = 6;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 100);
};

cardGenerator();
