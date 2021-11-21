import {images} from '/photos.js'

let imagesArray = images;
let level = 0; //liczba par
let sameCards = 0; //liczba takich samych kart
let allCardsRandom = []; //tablica wszystkich kart
let allImagesRandom = []; 
let cards = document.getElementsByClassName('card');
cards = [...cards];    

 //tablica ze wszystkimi obrazkami
const cardsContainer = document.querySelector('.cards__container');
const buttonReset = document.querySelector('.button.button-reset');
//czas gry
const timeAlert = document.querySelector("h2");


function choseGame() {
    let gameLevel = [{a:3, b:2},{a:4, b:2},{a:5, b:2},{a:6, b:2},{a:7, b:2},{a:8, b:2},{a:9, b:2},{a:7, b:3},{a:8, b:3}];
        gameLevel = [...gameLevel];
    const markup = gameLevel.map(item => 
        `<button class = "level__btn" data-length = "${item.a}" data-same_cards="${item.b}">${item.a}x${item.b}</button>`)
        .join("");
        cardsContainer.insertAdjacentHTML('afterbegin', markup);
        let buttonsLevel = document.querySelectorAll('.level__btn');
        buttonsLevel = [...buttonsLevel];
        buttonsLevel.forEach(button => {
        button.addEventListener('click', choseLevel);   
    })

    
}
 function choseLevel(event) {
        level=event.target.dataset.length;
        sameCards=event.target.dataset.same_cards;
        cardsContainer.innerHTML = ""; //wyrzucamy przyciski
        console.log(`${level}X${sameCards}`);
        createGame();
    } 
function  createGame() {       
    let allCards = [];      
    //losujemy wszystkie obrazki
    randomizer(imagesArray, allImagesRandom);
    console.log(allImagesRandom);
    
    //skracamy do poziomu gry (par) kart, podwajamy albo potrajamy i losujemy jeszcze raz
    allImagesRandom.splice(level);
    allCards= allImagesRandom.concat(allImagesRandom);
    if(sameCards === '3') { 
        allCards = allCards.concat(allImagesRandom);
        }
        //losowanie wszystkich kart
        randomizer(allCards, allCardsRandom);       
        //dodajemy do gry kontenery z wylosowanymi obrazkami
        createCardsContainer(allCardsRandom);
        cardsContainer.removeEventListener('click', choseLevel); 
    return allCardsRandom;
}

//funkcja losujaca, przyjmuje tablice i do nowej wstawia wylosowane elementy
const randomizer = (array, newArray) => {
    array = [...array];
    const arrayLength = array.length;
    while (arrayLength > newArray.length) {
        array.forEach(element => {
        const index = Math.floor(Math.random() * array.length);
        newArray.push(array[index]);
        array.splice(index, 1);
    return newArray;   
   })
}
}

function createCardsContainer (items) {
    const markup = items.map(item =>
         `<div class="card">
         <img class="card__image" src="${item.img}" alt=""/></div>`).join('');
    cardsContainer.insertAdjacentHTML('afterbegin', markup);
    cards = document.getElementsByClassName('card');
    cards = [...cards];
    cards.forEach(card => {
        card.classList.add('is-hidden');
        card.addEventListener('click', miniGame); 
    })
}

let activeCard = "";
    const activeCards = [];
    let gameResult = 0; 

const miniGame = (event) => {
   
    activeCard = event.target;
    activeCard.classList.remove('is-hidden');
    activeCard.removeEventListener('click', miniGame);

    if (sameCards === '2') {
        if (activeCards.length === 0) {
            activeCards[0] = activeCard;
            console.log('first card');
            return; }
        if (activeCards.length ===1) {
            cards.forEach(card => card.removeEventListener("click", miniGame))
            activeCards[1] = activeCard;
            console.log('second card');
    
            setTimeout(function() {
            if (activeCards[0].childNodes[1].src === activeCards[1].childNodes[1].src) {
                console.log('2 the same cards')
                    activeCards.forEach(card =>
                    card.classList.add('off'));
                    cards = cards.filter(card => !card.classList.contains("off"))
                    gameResult++;
                    if (gameResult == level) {
                        endGame()
                    }
               } else {
               activeCards.forEach(card => 
                card.classList.add("is-hidden"));    
            }
            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => 
            card.addEventListener('click', miniGame));    
            }, 500)
        }
    }
//gra 3 takie same karty
    if (sameCards === '3') {
        if (activeCards.length === 0) {
            activeCards[0] = activeCard;
            console.log('first card 3 cards game');
            return; }
        if (activeCards.length ===1) {
            cards.forEach(card => card.removeEventListener("click", miniGame))
            activeCards[1] = activeCard;
            console.log('second card 3 cards game');
    setTimeout(function() {
    if(activeCards[0].childNodes[1].src === activeCards[1].childNodes[1].src) {
        cards.forEach(card => 
            card.addEventListener('click', miniGame));
          console.log('2 the same cards');
            activeCards.forEach(card =>
            card.removeEventListener('click', miniGame));
            return;
        } else {
        activeCards.forEach(card => 
        card.classList.add("is-hidden"));  
    }
    activeCard = "";
    activeCards.length = 0;
    cards.forEach(card => 
    card.addEventListener('click', miniGame));
    }, 500)
    return; 
}

    if (activeCards.length === 2) {
        console.log('3-cia karta')
        cards.forEach(card => card.removeEventListener("click", miniGame));
        activeCards[2] = activeCard;
        setTimeout(function() {
            if (activeCards[1].childNodes[1].src === activeCards[2].childNodes[1].src) {
                console.log('3 takie same');
                activeCards.forEach(card =>
                    card.classList.add('off'));
                    cards = cards.filter(card => !card.classList.contains("off"));
                    gameResult++;
                    if (gameResult == level) {
                        endGame()
                        }          
            } else {
            activeCards.forEach(card => 
            card.classList.add("is-hidden"));       
        }
        activeCard = "";
        activeCards.length = 0;
        cards.forEach(card => 
        card.addEventListener('click', miniGame));
            }, 500)    
    }
}  
}

function reset() {
    window.location.reload()
}

function endGame() {
    const endTime = new Date().getTime();
    const gameTime = (endTime - startTime) / 1000; 
    console.log(`${gameTime}`);
    timeAlert.innerHTML = `Congratulations! You win!!! Your time is <br>  ${gameTime} sec`;
    cardsContainer.innerHTML = `<button class="button button-reset" id="button">One more time?</button>`;
    const buttonReset = document.querySelector('.button.button-reset');
    buttonReset.addEventListener('click', reset)
}

choseGame()

const startTime = new Date().getTime(); 
