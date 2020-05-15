document.addEventListener('DOMContentLoaded', () => {
  // Cards
  const cardSources = [
    {
      name: 'coin',
      img: 'images/coin.png',
    },
    {
      name: 'egg',
      img: 'images/egg.png',
    },
    {
      name: 'flower-blue',
      img: 'images/flower-blue.png',
    },
    {
      name: 'flower-red',
      img: 'images/flower-red.png',
    },
    {
      name: 'luigi',
      img: 'images/luigi.png',
    },
    {
      name: 'mario',
      img: 'images/mario.png',
    },
    {
      name: 'shell-green',
      img: 'images/shell-green.png',
    },
    {
      name: 'shell-red',
      img: 'images/shell-red.png',
    },
  ];

  // console.log styles:
  const successStyle = 'color: green;'
  const errorStyle = 'color: red; font-weight: bold;'

  const cardArray = [...cardSources, ...cardSources];
  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  const mario = document.querySelector('.mario')

  var cardsChosen = []
  var cardsChosenId = []
  const cardsWon = []

  // create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement('img')
      card.setAttribute('src', 'images/blank.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  // check for matches
  function checkForMatch() {
    var cards = document.querySelectorAll('.grid img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      // clicked the same card
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
    } else if (cardsChosen[0] === cardsChosen[1]) {
      console.log('%c You found a match', successStyle)
      cards[optionOneId].setAttribute('src', 'images/empty.png')
      cards[optionTwoId].setAttribute('src', 'images/empty.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      console.log('%c Sorry, try again', errorStyle)
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = `Score: ${cardsWon.length}`
    if (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = 'Congratulations 🎉 You found them all!'
      mario.setAttribute('src', 'images/branding/mario-yay.png')
    }
  }

  // flip a card
  function flipCard() {
    var cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard()
})