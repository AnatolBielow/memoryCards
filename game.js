import {images} from './photos.js'

let imagesArray = images;
let level = 0; //liczba par
let sameCards = 0; 
console.log(imagesArray)

 //tablica ze wszystkimi obrazkami
const cardsContainer = document.querySelector('.cards__container');

 function choseGame() {
     let gameLevel = [
         {a:3, b:2},
         {a:4, b:2},
         {a:5, b:2},
         {a:6, b:2},
         {a:7, b:2},
         {a:8, b:2},
         {a:9, b:2},
         {a:7, b:3},
         {a:8, b:3}
    ];
    
    gameLevel = [...gameLevel]
     const markup = gameLevel.map(item => 

        `<button class = "level__btn" data-length = "${item.a}" data-same_cards="${item.b}">${item.a} X ${item.b}</button>`
    ).join("");

    cardsContainer.insertAdjacentHTML('afterbegin', markup);
    
    cardsContainer.addEventListener('click', choseLevel);

    function choseLevel(event) {
        if(event.target === event.currentTarget) {return};
       
             level=event.target.dataset.length;
        
            sameCards=event.target.dataset.same_cards;
            cardsContainer.innerHTML = ""; //wyrzucamy przyciski
       }
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
<a class="card__link" href="">
  <img
    class="card__image"
    src="${item.img}"
    alt=""
  />
</a>
</div>
`).join("");
    cardsContainer.insertAdjacentHTML('afterbegin', markup);
}

const init = () => {
    choseGame();

    cardsContainer.addEventListener('click', createGame)

    function createGame(event)  {
        if(event.target===event.currentTarget) {return};
        let allImagesRandom = []; 
    //losujemy wszystkie obrazki
    
    randomizer(imagesArray, allImagesRandom);
    
    console.log(allImagesRandom)
    
    //skracamy do poziomu gry (par) kart, podwajamy albo potrajamy i losujemy jeszcze raz
    
    let allCards = [];  
    let allCardsRandom = []; 
    
    allImagesRandom.splice(level);
    
     allCards = allImagesRandom.concat(allImagesRandom);
     if(sameCards===3) {
        allCards = allCards.concat(allImagesRandom);
     }
    
    randomizer(allCards, allCardsRandom);  
    
    console.log(allCardsRandom);
    
    //dodajemy do gry kontenery z wylosowanymi obrazkami
    createCardsContainer(allCardsRandom);
    
    };





cardsContainer.removeEventListener('click', createGame);


const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.classList.add('is-hidden')
 card.addEventListener('click', miniGame)   
});


const miniGame = () =>{
    console.log(hahghj)
}

}



 init()  

const startTime = new Date().getTime(); 

//

//     setTimeout(function () {
//          cards.forEach(card => {
//              card.classList.add("hidden")
//              card.addEventListener("click", clickCard)
//          })
//     })
// };

let activeCard = ""; 
const activeCards = [];
   
//const gameLength = cards.length / 2;

let gameResult = 0;

 const clickCard = function () {

     activeCard = this; //w co zostaĹo klikniÄte
     console.log(this.target) //o ile przekazane event to to samo co this

     //czy to klikniÄcie w ten sam element (tylko drugi moĹźe daÄ true) Musi byÄ przed ukryciem dodane
     if (activeCard == activeCards[0]) return;

     activeCard.classList.remove("hidden"); //ukrycie karty, ktĂłra zostaĹa klikniÄta

     //czy to 1 klikniÄcie, czy tablica ma dĹugoĹÄ 0
     if (activeCards.length === 0) {
         console.log("1 element");
         activeCards[0] = activeCard; //przypisanie do pozycji numer 1 wybranej karty
         return;

     }
     //czy to 2 klikniÄcie - else bo jeĹli nie pierwsze, to drugie
     else {
         console.log("2 element");
         //na chwilÄ zdejmujemy moĹźliwoĹÄ klikniÄcie 
         cards.forEach(card => card.removeEventListener("click", clickCard))
         //ustawienie drugiego klikniÄcia w tablicy w indeksie 1
         activeCards[1] = activeCard;

         //PĂłĹ sekundy od odsĹoniecia - decyzja czy dobrze czy Ĺşle
         setTimeout(function () {
             //sprawdzenie czy to te same karty - wygrana
             if (activeCards[0].className === activeCards[1].className) {
                 console.log("wygrane")
                 activeCards.forEach(card => card.classList.add("off"))
                 gameResult++;
                 console.log(gameResult);
                 cards = cards.filter(card => !card.classList.contains("off"));
                 //Sprawdzenie czy nastÄpiĹ koniec gry
                 if (gameResult == gameLength) {
                     const endTime = new Date().getTime();
                     const gameTime = (endTime - startTime) / 1000; 
                     console.log({gameTime});
                     const timeAlert = document.querySelector("h2");
                     //const title = document.querySelector(".article .title");
                    //title.innerHTML = 'New and <span class="accent">improved</span> title';
                     timeAlert.innerHTML = `Congratulations! You win!!! Your time is <br>  ${gameTime} sec`;
                     const button = document.getElementById('button');
                    button.classList.remove("is-hidden");
                 
                    button.onclick = function() {
                    location.reload()};

                    
                 }
             }
             //przegrana. ponowne ukrycie
             else {
                 console.log("przegrana")
                 activeCards.forEach(card => card.classList.add("hidden"))
             }
             //Reset do nowej gry
             activeCard = ""; //aktywna karta pusta
             activeCards.length = 0; //dĹugoĹÄ tablicy na zero
             cards.forEach(card => card.addEventListener("click", clickCard))//przywrĂłcenie nasĹuchiwania

         }, 500)
     }
    }


 
//init()
