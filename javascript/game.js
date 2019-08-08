class Game {
    constructor() {
        this.cardsWrapper = document.querySelector('.main-game');
        this.cardNameArray = ['bootstrap', 'css', 'git', 'html5', 'javascript', 'jquery', 'mongo', 'node', 'react', 'redux', 'sass', 'webpack'];
        this.listOfCards = ([]);
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
                count++;
                if (count <= 2) {
                    document.querySelector(`[data-idm = "${event.target.dataset.id}"]`).classList.add('main-game__single-item--active');
                    tempArrayChoosenCards.push({
                        name: event.target.dataset.name,
                        id: event.target.dataset.id
                    });

                    if (tempArrayChoosenCards.length == 2) {
                        const firstCard = tempArrayChoosenCards[0].id;
                        const secondCard = tempArrayChoosenCards[1].id
                        if (tempArrayChoosenCards[0].name === tempArrayChoosenCards[1].name) {
                            tempArrayChoosenCards.forEach( element => {
                                this.selectedCards.push({name: element.name, id: element.id});
                                document.querySelector(`[data-idm = "${element.id}"]`).classList.add('main-game__single-item--green');
                            })
                            tempArrayChoosenCards = [];
                            count = 0;
                        } else {
                            intervalID = setInterval(() => {
                                document.querySelector(`[data-idm = "${firstCard}"]`).classList.remove('main-game__single-item--active');
                                document.querySelector(`[data-idm = "${secondCard}"]`).classList.remove('main-game__single-item--active');
                                tempArrayChoosenCards = [];
                                count = 0;
                            }, 6000);
                        }

                    } else {
                        window.clearInterval(intervalID);
                        return;
                    }
                } else if (count > 3) {
                    return;
                }
            }
        })
    }

}
export default Game;