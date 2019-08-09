class Game {
    constructor() {
        this.cardsWrapper = document.querySelector('.main-game');
        this.movesSelector = document.querySelector('[data-menu = "moves"');
        this.numberOfSelectedCardsCurrentValue = document.querySelector('.container__content--current-value');
        this.numberOfSelectedCardsMax = document.querySelector('.container__content--max-amount');
        this.timeMinute = document.querySelector('.container__content--time-minute');
        this.timeSeconds = document.querySelector('.container__content--time-sec');
        this.resetButton = document.querySelector('.menu__button');
        this.gameResult = document.querySelector('.game-result');
        this.gameResultContainer = document.querySelector('.game-result__container');
        this.gameResultMoves = document.querySelector('.game-result__moves--counter');
        this.gameResultMinutes = document.querySelector('.game-result__time--minutes');
        this.gameResultSeconds = document.querySelector('.game-result__time--seconds');
        this.gameResultButton = document.querySelector('.game-result__button');
        this.cardNameArray = ['bootstrap', 'css', 'git', 'html5', 'javascript', 'jquery', 'mongo', 'node', 'react', 'redux', 'sass', 'webpack'];
        this.listOfCards = ([]);
        this.selectedCards = [];
        this.counterOfMoves = 0;
        this.numberOfSelectedCard = 0;
        this.intervalID = 0;
        this.timeInterval = 0;
        this.timeCounter = 0;
        this.ifStarted = false;
        this.drawBoard();
        this.chooseCard();
        this.exitResults();
        this.resetGame();


    }

    drawBoard() {
        let counter = 0;
        Array.prototype.random = function () {
            return this[Math.floor((Math.random() * this.length))];
        }

        if (counter <= 23) {
            let checkIfOk = false;
            let countHowMany = 0;

            for (let counter = 0; counter <= 23; counter++) {
                const singleElementDiv = document.createElement('div');
                singleElementDiv.classList.add('main-game__single-item');
                singleElementDiv.dataset.idm = counter;
                this.cardsWrapper.appendChild(singleElementDiv);
                checkIfOk = false;
                countHowMany = 0;
                while (checkIfOk == false) {
                    let randomCard = this.cardNameArray.random();
                    countHowMany = 0;
                    [...this.listOfCards].forEach(element => {
                        if (element.name === randomCard) {
                            countHowMany++;
                        }
                    })

                    if (countHowMany > 1) {
                        let id = 0;
                        this.cardNameArray.forEach((ele, index) => {
                            if (ele == randomCard) {
                                id = index
                            }
                        });
                        this.cardNameArray.splice(id, 1);
                    } else {
                        this.listOfCards.push({
                            name: randomCard
                        });

                        const backgroundImage = document.createElement('img');
                        backgroundImage.classList.add('item__background-img');
                        backgroundImage.dataset.id = counter;
                        backgroundImage.dataset.name = `${randomCard}`;
                        backgroundImage.src = './images/card-background.png';
                        document.querySelector(`[data-idm = "${counter}"]`).appendChild(backgroundImage);

                        const mainImage = document.createElement('img');
                        mainImage.classList.add('item__main-img');
                        mainImage.src = `./images/${randomCard}.png`;
                        mainImage.dataset.name = `${randomCard}`;
                        document.querySelector(`[data-idm = "${counter}"]`).appendChild(mainImage);

                        checkIfOk = true;
                    }
                }

                this.numberOfSelectedCardsMax.textContent = this.listOfCards.length / 2;

            }
        } else {
            return;
        }

    }

    chooseCard() {
        let count = 0;
        let tempArrayChoosenCards = [];



        this.cardsWrapper.addEventListener('click', (event) => {
            if (event.target.dataset.id) {
                count++;
                this.ifStarted = true;

                if (count <= 2) {
                    this.counterOfMoves++;
                    this.movesSelector.textContent = this.counterOfMoves;

                    if (this.counterOfMoves == 1) {

                        this.timeInterval = setInterval(() => {
                            let numberOfMinutes = 0;
                            let numberOfSeconds = this.timeCounter
                            if (this.ifStarted == true) {
                                if (numberOfSeconds >= 0 && numberOfSeconds <= 9) {
                                    this.timeSeconds.textContent = `0${numberOfSeconds}`
                                } else if (numberOfSeconds >= 10 && numberOfSeconds < 60) {
                                    this.timeSeconds.textContent = `${numberOfSeconds}`
                                } else if (numberOfSeconds == 60) {
                                    this.timeCounter = 0;
                                    numberOfMinutes++;
                                    this.timeMinute.textContent = numberOfMinutes;
                                    this.timeSeconds.textContent = '00'
                                }
                                this.timeCounter++;
                            } else {
                                clearInterval(this.timeInterval);
                            }
                        }, 1000);
                    }

                    document.querySelector(`[data-idm = "${event.target.dataset.id}"]`).classList.add('main-game__single-item--active');
                    tempArrayChoosenCards.push({
                        name: event.target.dataset.name,
                        id: event.target.dataset.id
                    });

                    if (tempArrayChoosenCards.length == 2) {
                        const firstCard = tempArrayChoosenCards[0].id;
                        const secondCard = tempArrayChoosenCards[1].id
                        if (tempArrayChoosenCards[0].name === tempArrayChoosenCards[1].name) {
                            tempArrayChoosenCards.forEach(element => {
                                this.selectedCards.push({
                                    name: element.name,
                                    id: element.id
                                });
                                document.querySelector(`[data-idm = "${element.id}"]`).classList.add('main-game__single-item--green');
                            })
                            this.numberOfSelectedCard += 1
                            this.numberOfSelectedCardsCurrentValue.textContent = this.numberOfSelectedCard

                            if (this.numberOfSelectedCard == this.numberOfSelectedCardsMax.textContent) {
                                this.ifStarted = false;
                                this.gameResult.classList.add('game-result--active');
                                this.gameResultContainer.classList.add('game-result__container--active');
                                this.gameResultMoves.textContent = this.counterOfMoves;
                                this.gameResultMinutes.textContent = this.timeMinute.textContent;
                                this.gameResultSeconds.textContent = this.timeSeconds.textContent;
                            }

                            tempArrayChoosenCards = [];
                            count = 0;
                        } else {
                            this.intervalID = setInterval(() => {
                                document.querySelector(`[data-idm = "${firstCard}"]`).classList.remove('main-game__single-item--active');
                                document.querySelector(`[data-idm = "${secondCard}"]`).classList.remove('main-game__single-item--active');
                                tempArrayChoosenCards = [];
                                count = 0;
                            }, 3000);
                        }

                    } else {
                        window.clearInterval(this.intervalID);
                        return;
                    }

                } else if (count > 3) {
                    return;
                }

            }
        })

    }

    exitResults() {
        document.querySelector('.game-result__icon').addEventListener('click', () => {
            this.gameResultContainer.classList.remove('game-result__container--active');
            this.gameResult.classList.remove('game-result--active');
        })
    }

    resetGame() {
        const resetButtonsArray = [this.resetButton, this.gameResultButton];

        resetButtonsArray.forEach((element) => {
            element.addEventListener('click', () => {
                //reset number of moves
                this.counterOfMoves = 0;
                this.movesSelector.textContent = this.counterOfMoves;

                //reset number of finded cards
                this.numberOfSelectedCard = 0;
                this.numberOfSelectedCardsCurrentValue.textContent = this.numberOfSelectedCard;

                //timer reset
                this.timeCounter = 0;
                this.timeMinute.textContent = '0';
                this.timeSeconds.textContent = '00';
                window.clearInterval(this.timeInterval);

                //cards reset
                this.selectedCards = [];
                [...document.querySelectorAll('.main-game__single-item')].forEach(ele => {
                    ele.classList.remove('main-game__single-item--active');
                    ele.classList.remove('main-game__single-item--green');
                });
            })
        })

        this.gameResultButton.addEventListener('click', () => {
            this.gameResultContainer.classList.remove('game-result__container--active');
            this.gameResult.classList.remove('game-result--active');
        });
    }
}
export default Game;