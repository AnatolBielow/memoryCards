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

let activeCard = ""; //ktĂłra karta zostaĹa aktualnie klikniÄta
const activeCards = [];
   
const gameLength = cards.length / 2;

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
 };


init()


