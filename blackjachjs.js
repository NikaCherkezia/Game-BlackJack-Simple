//Player variables

let cards = [];
let sum = 0;
let hasBlackjack = false;
let isAlive = false;

// Delaer variables
let dealerCards = [];
let dealerSum = 0;
let dealerHasBlackjack = false;
let dealerIsAlive = false;

//Diplayed messages
let showCards = document.getElementById("cards");
let message = document.getElementById("message-el");
let sumMessage = document.querySelector("#sum");

let showDealersCards = document.getElementById("dealers-cards");
let dealersSumMessage = document.getElementById("dealers-sum");

//Player details

let player = {
    name: "Nika",
    chips: 200,
}

let dealer = {
    name: "Dealer",
}

let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;
//Random card creator

function getRandomCard() {
    return Math.floor((Math.random() * 10 ) + 2 );
}



function startGame() {
    isAlive = true;
    dealerIsAlive = true;

    let firstCard = getRandomCard();
    let secondCard = getRandomCard();

    let dealersFirstCard = getRandomCard();
    let dealersSecondCard = getRandomCard();

    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;

    dealerCards = [dealersFirstCard, dealersSecondCard];
    dealerSum = dealersFirstCard + dealersSecondCard;

    
    renderGame();
}

function renderGame(){
    let textForShowingCards = "Your Cards: ";

    let textForShowingDealersCards = "Dealer's Cards: "
    
    for (let i = 0; i < dealerCards.length; i++) {
        textForShowingDealersCards += dealerCards[i] + " ";
    }

    showDealersCards.textContent = textForShowingDealersCards;
    
    for (let i = 0; i < cards.length; i++) {
        textForShowingCards += cards[i] + " ";
    }
    
    showCards.textContent = textForShowingCards;

// If statements for player

    if (sum < 21 && dealerSum < 21 && dealerSum >= sum) {
        message.textContent = "Would you like to draw a new card?";
        isAlive = true;
        dealerIsAlive = true;
        hasBlackjack = false;
        dealerHasBlackjack = false;
        
    } else if (sum === 21) {
        message.textContent = "You've got a Blackjack!";
        hasBlackjack = true;
        dealerHasBlackjack = false;
        
    } else if (sum < 21 && dealerSum > 21) {
        message.textContent = "You've won!"
        dealerIsAlive = false;
        
    } else if (dealerSum === 21) {
        dealerHasBlackjack = true;
        isAlive = false;
        message.textContent = "You're out of the game!"
    } else if (sum >21) {
        message.textContent = "You're out of the game!"
        isAlive = false;
    }
    else {
         message.textContent = "Would you like to draw a new card?";
         isAlive = true;
         dealerIsAlive = true;
         
    }

    sumMessage.textContent = "Sum: " + sum;
    dealersSumMessage.textContent = "Dealer's Sum: " + dealerSum;

    
}

function newCard() {

    if (isAlive && hasBlackjack ===false && dealerIsAlive) {
        let displayNewCard = getRandomCard();
        if (sum ===20 && displayNewCard ===11) {
            displayNewCard = 1;
        }
        let displayDealersNewCard = getRandomCard();
        sum += displayNewCard;
        dealerSum += displayDealersNewCard;
        
        if (dealerSum < sum && sum < 21) {
            
            dealerCards.push(displayDealersNewCard);
            
        } else {
           dealerSum = dealerSum - displayDealersNewCard;
           
        }
        
        cards.push(displayNewCard);

        renderGame();
    }
}

function endGame() {
    if (isAlive && hasBlackjack ===false && dealerIsAlive && sum > dealerSum) {
        while (dealerSum <21 && dealerSum < sum) {
            let displayDealersNewCard = getRandomCard();
            dealerSum += displayDealersNewCard;
            dealerCards.push(displayDealersNewCard);
            renderGame();
        }
        
    }
    
}
