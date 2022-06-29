let deckId;
const cardsContainer =  document.getElementById("cards")
const newDeck = document.getElementById("btn")
const drawCards =  document.getElementById("draw-cards")
const ostatak = document.getElementById('header')
const remainingText = document.getElementById('remaining')
const computer = document.getElementById('computer')
const myScore = document.getElementById('myscore')
let cScore = 0
let mScore = 0

newDeck.addEventListener('click', async function(){
   const res = await fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/',
    {method:'GET'})
    const card = await res.json()
        remainingText.textContent = `Remaining cards: ${card.remaining}`
        deckId = card.deck_id
})



drawCards.addEventListener('click', async function(){
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const card = await res.json()
     
        remainingText.textContent = `Remaining cards: ${card.remaining}`
        cardsContainer.children[0].innerHTML = `
        <img src=${card.cards[0].image} class="card" />
    `
    cardsContainer.children[1].innerHTML = `
        <img src=${card.cards[1].image} class="card" />
    `    
    const winnerText = determineCardWinner(card.cards[0], card.cards[1])
    ostatak.textContent = winnerText
    // if(card.remaining == 0){
    //     drawCards.classList.add('disabled')      moje
    // } else {
    //     drawCards.classList.remove('disabled')
    // }
    if (card.remaining === 0) {
        drawCards.disabled = true
        drawCards.style.cursor= 'not-allowed'
    if (computer > myScore){
        header.textContent = 'Computer wins'
    } else if(myScore > computer){
        header.textContent = 'You win'
    } else {
        header.textContent = 'Call it a tie!'
    }
}
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    //value ce da provjeri index iz niza valueOptions
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        cScore++
        computer.textContent = `Computer score: ${cScore}`
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        mScore++
        myScore.textContent = `Your score: ${mScore}`
        return "You win!"
    }   else {
        return  'WAR'
    }
}

determineCardWinner()



// const card1Obj = {
//     value: "7"
// }
// const card2Obj = {       //ovako mou da vidim na kom je indexu karta
//     value: "KING"
// }

// determineCardWinner(card1Obj, card2Obj)
        /*
        * Challenge:
        * 
        * Try to determine which of the 2 cards is the "winner" (has higher value)
        * Aces are the card with the highest "score"
        * 
        * In parts:
        * 
        * 1. Create a function that takes 2 card objects as parameters, 
        * `card1` and `card2`. These card objects have a property called
        * `value`, which can be any one of the following strings, in
        * order of rising "score":
        * 
        * "2", "3", "4", "5", "6", "7", "8", "9", 
        * "10", "JACK", "QUEEN", "KING", "ACE"
        * 
        * I.e. "2" is the lowest score and "ACE" is the highest.
        * 
        * The function should determine which of the 2 cards (`card1`
        * or `card2`) has the higher score, or if they have the same score.
        * 
        * Log which card wins (or "It's a tie!" 
        * if they're the same) to the console
        */