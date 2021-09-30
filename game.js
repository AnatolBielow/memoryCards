const cardsPhoto = ["ashoka", "cavan", "mandalorian", "obiwan", "repeta", "rey", "yim", "yoda"];
let cardsPhotoRandom = [...cardsPhoto];

let cards = document.getElementsByClassName("card");
cards = [...cards];

let doubleCards = [];
let cardsArray = [];

const startTime = new Date().getTime(); 

const init = () => {
while (cardsPhoto.length > cardsArray.length) {
cardsPhotoRandom.forEach(card => {
    const index = Math.floor(Math.random() * cardsPhotoRandom.length);
    cardsArray.push(cardsPhotoRandom[index]);
    cardsPhotoRandom.splice(index, 1);
console.log(cardsArray);
})
}
cardsArray.splice(6);
doubleCards = cardsArray.concat(cardsArray);

console.log(doubleCards);
doubleCards.forEach(card =>{
    const position = Math.floor(Math.random() *  doubleCards.length);
});
 cards.forEach(card => {
        const position = Math.floor(Math.random() * doubleCards.length);
        card.classList.add(doubleCards[position]);
        doubleCards.splice(position, 1);
    });

    setTimeout(function () {
         cards.forEach(card => {
             card.classList.add("hidden")
             card.addEventListener("click", clickCard)
         })
    })
};

let activeCard = ""; //która karta została aktualnie kliknięta
const activeCards = [];
   
const gameLength = cards.length / 2;

let gameResult = 0;

 const clickCard = function () {

     activeCard = this; //w co zostało kliknięte
     console.log(this.target) //o ile przekazane event to to samo co this

     //czy to kliknięcie w ten sam element (tylko drugi może dać true) Musi być przed ukryciem dodane
     if (activeCard == activeCards[0]) return;

     activeCard.classList.remove("hidden"); //ukrycie karty, która została kliknięta

     //czy to 1 kliknięcie, czy tablica ma długość 0
     if (activeCards.length === 0) {
         console.log("1 element");
         activeCards[0] = activeCard; //przypisanie do pozycji numer 1 wybranej karty
         return;

     }
     //czy to 2 kliknięcie - else bo jeśli nie pierwsze, to drugie
     else {
         console.log("2 element");
         //na chwilę zdejmujemy możliwość kliknięcie 
         cards.forEach(card => card.removeEventListener("click", clickCard))
         //ustawienie drugiego kliknięcia w tablicy w indeksie 1
         activeCards[1] = activeCard;

         //Pół sekundy od odsłoniecia - decyzja czy dobrze czy źle
         setTimeout(function () {
             //sprawdzenie czy to te same karty - wygrana
             if (activeCards[0].className === activeCards[1].className) {
                 console.log("wygrane")
                 activeCards.forEach(card => card.classList.add("off"))
                 gameResult++;
                 cards = cards.filter(card => !card.classList.contains("off"));
                 //Sprawdzenie czy nastąpił koniec gry
                 if (gameResult == gameLength) {
                     const endTime = new Date().getTime();
                     const gameTime = (endTime - startTime) / 1000
                     alert(`Udało się! Twój wynik to: ${gameTime} sekund`)
                     location.reload();
                 }
             }
             //przegrana. ponowne ukrycie
             else {
                 console.log("przegrana")
                 activeCards.forEach(card => card.classList.add("hidden"))
             }
             //Reset do nowej gry
             activeCard = ""; //aktywna karta pusta
             activeCards.length = 0; //długość tablicy na zero
             cards.forEach(card => card.addEventListener("click", clickCard))//przywrócenie nasłuchiwania

         }, 500)
     }
 };


init()



