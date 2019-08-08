class Game {
    constructor() {
        this.cardsWrapper = document.querySelector('.main-game');
        this.cardNameArray = ['bootstrap', 'css', 'git', 'html5', 'javascript', 'jquery', 'mongo', 'node', 'react', 'redux', 'sass', 'webpack'];
        this.listOfCardWithPairs = ([]);
        this.selectedCards = [];
        this.drawBoard();
        this.chooseCard();
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
                    [...this.listOfCardWithPairs].forEach(element => {
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
                        this.listOfCardWithPairs.push({
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
            }
        } else {
            return;
        }

    }



    chooseCard() {
        var intervalID = 0;
        let count = 0;
        let tempArrayChoosenCards = [];
        this.cardsWrapper.addEventListener('click', (event) => {
            if (event.target.dataset.id) {

                [...document.querySelectorAll('.main-game__single-item')].forEach(ele => {
                    if (ele.classList.contains('main-game__single-item--active')) {
                        count++;
                    }
                });

                if (count < 2) {
                    document.querySelector(`[data-idm = "${event.target.dataset.id}"]`).classList.add('main-game__single-item--active');

                    tempArrayChoosenCards.push(event.target.dataset.name)
                    console.log(tempArrayChoosenCards)
                    if (tempArrayChoosenCards.length != 2) {
                        console.log("op2");
                        console.log("option 2")
                        intervalID = setInterval(() => {
                            document.querySelector(`[data-idm = "${event.target.dataset.id}"]`).classList.remove('main-game__single-item--active')
                        }, 6000);
                        console.log(intervalID)
                    } else if (tempArrayChoosenCards.length == 2 && tempArrayChoosenCards[0] !== tempArrayChoosenCards[1]) {
                        console.log("op1")
                        setInterval(() => {
                            document.querySelector(`[data-idm = "${event.target.dataset.id}"]`).classList.remove('main-game__single-item--active')
                        }, 6000);
                        tempArrayChoosenCards = [];

                    }
                    if (tempArrayChoosenCards.length == 2 && tempArrayChoosenCards[0] === tempArrayChoosenCards[1]) {
                        tempArrayChoosenCards = [];
                        console.log("ok");
                        console.log(intervalID)
                        window.clearInterval(intervalID);
                        
                    }
                    count = 0;

                } else if (count >= 2) {
                    count = 0;
                }
            }
        })
    }

}
export default Game;