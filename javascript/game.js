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
        let count = 0;

        this.cardsWrapper.addEventListener('click', (event) => {
            if (event.target.dataset.id) {

                [...document.querySelectorAll('.main-game__single-item')].forEach(ele => {
                    if (ele.classList.contains('main-game__single-item--active')) {
                        count++;
                    }
                });

                if (count < 2) {
                    document.querySelector(`[data-idm = "${event.target.dataset.id}"]`).classList.add('main-game__single-item--active');
                    let tempName = event.target.dataset.name;
                    this.selectedCards.push(tempName);
                    if (false) {
                        

                       

                    } else {
                        
                        setInterval(() => {
                            document.querySelector(`[data-idm = "${event.target.dataset.id}"]`).classList.remove('main-game__single-item--active')
                        }, 4000);
                    }
                    count = 0;
                    tempName = "";
                } else if (count >= 2) {
                    count = 0;
                }
            }
        })
    }

}
export default Game;