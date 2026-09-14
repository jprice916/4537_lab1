//Constants
const MILLISECONDS_PER_SECOND = 1000;
const SHUFFLE_INTERVAL_MS = 2000;
const COLOR_CHANNEL_MAX = 256;
const SQUARE_WIDTH_EM = 10;
const SQUARE_HEIGHT_EM = 5;
const LOOP_START_INDEX = 0;
const SQUARE_NUMBER_OFFSET = 1;
const FIRST_SQUARE_NUMBER = 1;

class InputValidator {

    constructor() {
        this.input = document.getElementById("NumInp");
        this.min = Number(this.input.min);
        this.max = Number(this.input.max);
    }

    Validate() {

        const boundary = document.getElementById("boundary");

        // Remove the previous game
        boundary.innerHTML = "";

        this.value = Number(this.input.value);

        //Validates
        if (this.value >= this.min && this.value <= this.max) {

            const maker = new SquareMaker(this.value);
            maker.make();

        } else {

            window.alert(
                user.GetText("invalidNumber")
            );

        }
    }
}


class SquareMaker {


    constructor(SqrNum) {
        this.SqrNum = SqrNum;
    }

    ColorChooser() {

        const r = Math.floor(Math.random() * COLOR_CHANNEL_MAX);
        const g = Math.floor(Math.random() * COLOR_CHANNEL_MAX);
        const b = Math.floor(Math.random() * COLOR_CHANNEL_MAX);

        return `rgb(${r}, ${g}, ${b})`;
    }

    make() {

        const boundary = document.getElementById("boundary");

        const WaitTime = this.SqrNum * this.MILLISECONDS_PER_SECOND;

        // Create the squares
        for (let Sqr = 0; Sqr < this.SqrNum; Sqr++) {

            let square = document.createElement("div");

            square.style.width = `${SQUARE_WIDTH_EM}em`;
            square.style.height = `${SQUARE_HEIGHT_EM}em`;

            square.style.backgroundColor = this.ColorChooser();

            square.textContent = Sqr + SQUARE_NUMBER_OFFSET;

            square.className = "square";

            boundary.appendChild(square);
        }

        const shuffle = new Shuffler(this.SqrNum);

        // Wait before starting the shuffle
        setTimeout(() => {

            shuffle.Shuffle();

        }, WaitTime);
    }
}


class Shuffler {

    constructor(ShuffleNum) {
        this.ShuffleNum = ShuffleNum;
    }

    Shuffle() {

        const boundary = document.getElementById("boundary");

        const squares = boundary.querySelectorAll(".square");

        // Shuffles multiple times
        for (let shuffles = 0; shuffles < this.ShuffleNum; shuffles++) {

            //randomize the pos of each square
            setTimeout(() => {

                for (let square of squares) {

                    let x =
                        Math.random() *
                        (boundary.clientWidth -
                            square.offsetWidth);

                    let y =
                        Math.random() *
                        (boundary.clientHeight -
                            square.offsetHeight);

                    square.style.position = "absolute";

                    square.style.left = x + "px";

                    square.style.top = y + "px";
                }

            }, shuffles * SHUFFLE_INTERVAL_MS);
        }

        // Start the memory game after shuffling
        setTimeout(() => {

            const game =
                new MemoryGame(this.ShuffleNum);

            game.Start();

        }, this.ShuffleNum * SHUFFLE_INTERVAL_MS);
    }
}


class MemoryGame {

    constructor(SqrNum) {

        this.SqrNum = SqrNum;

        this.nextNumber = FIRST_SQUARE_NUMBER;

        this.gameOver = false;
    }

    Start() {

        const boundary =
            document.getElementById("boundary");

        const squares =
            boundary.querySelectorAll(".square");

        for (let square of squares) {

            // Save the number
            square.dataset.number =
                square.textContent;

            // Hide the number
            square.textContent = "";

            // Make clickable
            square.style.cursor = "pointer";

            square.addEventListener(
                "click",
                (event) => {

                    this.ClickSquare(event.target);

                }
            );
        }
    }

    ClickSquare(square) {

        // Do nothing if the game is already over
        if (this.gameOver) {
            return;
        }

        const number =
            Number(square.dataset.number);

        // Correct number
        if (number === this.nextNumber) {

            // Show the number
            square.textContent = number;

            // Disable this square
            square.style.pointerEvents = "none";

            this.nextNumber++;

            // Player has completed the game
            if (this.nextNumber > this.SqrNum) {

                this.gameOver = true;

                this.Message(
                    user.GetText("excellentMemory")
                );
            }
        }

        // Wrong number
        else {

            this.gameOver = true;

            this.Message(
                user.GetText("wrongOrder")
            );

            // Reveal all squares
            const squares =
                document
                    .getElementById("boundary")
                    .querySelectorAll(".square");

            for (let otherSquare of squares) {

                otherSquare.textContent =
                    otherSquare.dataset.number;

                otherSquare.style.pointerEvents =
                    "none";
            }
        }
    }

    Message(text) {

        const message =
            document.getElementById("gameMessage");

        message.textContent = text;
    }
}


// Create the validator
const validator = new InputValidator();


// Start the game when the button is clicked
document
    .getElementById("startButton")
    .addEventListener("click", function () {

        validator.Validate();

    });