import {images} from '/photos.js'

let imagesArray = images;
let level = 0; //liczba par
let sameCards = 0; 
console.log(imagesArray);
let allCardsRandom = [];
    let allImagesRandom = []; 
let cards = document.getElementsByClassName('card');
cards = [...cards];    

 //tablica ze wszystkimi obrazkami
const cardsContainer = document.querySelector('.cards__container');

 function choseGame() {
     let gameLevel = [
         {a:3, b:2},{a:4, b:2},{a:5, b:2},{a:6, b:2},{a:7, b:2},{a:8, b:2},{a:9, b:2},{a:7, b:3},{a:8, b:3}
    ];
    
    gameLevel = [...gameLevel];

    const markup = gameLevel.map(item => 
        `<button class = "level__btn" data-length = "${item.a}" data-same_cards="${item.b}">${item.a} X ${item.b}
        <svg>
            <use href="./img/2cards.svg" style="fill:red;stroke:black"></use>
        </svg>
        </button>`
    ).join("");
    

    cardsContainer.insertAdjacentHTML('afterbegin', markup);
    let buttonsLevel = document.querySelectorAll('.level__btn');
    buttonsLevel = [...buttonsLevel];
    buttonsLevel.forEach(button => {
        button.addEventListener('click', choseLevel);   
    })

    function choseLevel(event) {
       
             level=event.target.dataset.length;
        
            sameCards=event.target.dataset.same_cards;
            cardsContainer.innerHTML = ""; //wyrzucamy przyciski
            console.log(level);
            console.log(sameCards);

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
  <img
    class="card__image"
    src="${item.img}"
    alt=""
  />
</div>
`).join("");
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
                        const endTime = new Date().getTime();
                        const gameTime = (endTime - startTime) / 1000; 
                        console.log(`${gameTime}`);
                        const timeAlert = document.querySelector("h2");
                        timeAlert.innerHTML = `Congratulations! You win!!! Your time is <br>  ${gameTime} sec`;
                        // const button = document.getElementById('button');
                        // button.classList.remove("is-hidden");
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
            activeCards[1] = activeCard;
            console.log('second card 3 cards game');
setTimeout(function() {
    if(activeCards[0].childNodes[1].src === activeCards[1].childNodes[1].src) {
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
                        const endTime = new Date().getTime();
                        const gameTime = (endTime - startTime) / 1000; 
                        console.log(`${gameTime}`);
                        const timeAlert = document.querySelector("h2");
                        timeAlert.innerHTML = `Congratulations! You win!!! Your time is <br>  ${gameTime} sec`;
                        const button = document.getElementById('button');
                        button.classList.remove("is-hidden");}          
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
                     


choseGame()

const startTime = new Date().getTime(); 

   
//const gameLength = cards.length / 2;



//  const clickCard = function () {

//      activeCard = this; //w co zostaĹo klikniÄte
//      console.log(this.target) //o ile przekazane event to to samo co this

//      //czy to klikniÄcie w ten sam element (tylko drugi moĹźe daÄ true) Musi byÄ przed ukryciem dodane
//      

//      activeCard.classList.remove("hidden"); //ukrycie karty, ktĂłra zostaĹa klikniÄta

//      //czy to 1 klikniÄcie, czy tablica ma dĹugoĹÄ 0
//      if (activeCards.length === 0) {
//          console.log("1 element");
//          activeCards[0] = activeCard; //przypisanie do pozycji numer 1 wybranej karty
//          return;

//      }
//      //czy to 2 klikniÄcie - else bo jeĹli nie pierwsze, to drugie
//      else {
//          console.log("2 element");
//          //na chwilÄ zdejmujemy moĹźliwoĹÄ klikniÄcie 
//          cards.forEach(card => card.removeEventListener("click", clickCard))
//          //ustawienie drugiego klikniÄcia w tablicy w indeksie 1
//          activeCards[1] = activeCard;

//          //PĂłĹ sekundy od odsĹoniecia - decyzja czy dobrze czy Ĺşle
//          setTimeout(function () {
//              //sprawdzenie czy to te same karty - wygrana
//              if (activeCards[0].className === activeCards[1].className) {
//                  console.log("wygrane")
//                  activeCards.forEach(card => card.classList.add("off"))
//                  gameResult++;
//                  console.log(gameResult);
//                  cards = cards.filter(card => !card.classList.contains("off"));
//                  //Sprawdzenie czy nastÄpiĹ koniec gry
//                  if (gameResult == gameLength) {
//                      const endTime = new Date().getTime();
//                      const gameTime = (endTime - startTime) / 1000; 
//                      console.log({gameTime});
//                      const timeAlert = document.querySelector("h2");
//                      timeAlert.innerHTML = `Congratulations! You win!!! Your time is <br>  ${gameTime} sec`;
//                      const button = document.getElementById('button');
//                     button.classList.remove("is-hidden");
                 
//                     button.onclick = function() {
//                     location.reload()};

                    
//                  }
//              }
//              //przegrana. ponowne ukrycie
//              else {
//                  console.log("przegrana")
//                  activeCards.forEach(card => card.classList.add("hidden"))
//              }
//              //Reset do nowej gry
//              activeCard = ""; //aktywna karta pusta
//              activeCards.length = 0; //dĹugoĹÄ tablicy na zero
//              cards.forEach(card => card.addEventListener("click", clickCard))//przywrĂłcenie nasĹuchiwania

//          }, 500)
//      }
//     }


 
//init()
