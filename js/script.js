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

        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        return `rgb(${r}, ${g}, ${b})`;
    }

    make() {

        const boundary = document.getElementById("boundary");

        const WaitTime = this.SqrNum * 1000;

        // Create the squares
        for (let Sqr = 0; Sqr < this.SqrNum; Sqr++) {

            let square = document.createElement("div");

            square.style.width = "10em";
            square.style.height = "5em";

            square.style.backgroundColor =
                this.ColorChooser();

            square.textContent = Sqr + 1;

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

        const squares =
            boundary.querySelectorAll(".square");

        // Shuffle the squares
        for (
            let shuffles = 0;
            shuffles < this.ShuffleNum;
            shuffles++
        ) {

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

            }, shuffles * 2000);
        }

        // Start the memory game after shuffling
        setTimeout(() => {

            const game =
                new MemoryGame(this.ShuffleNum);

            game.Start();

        }, this.ShuffleNum * 2000);
    }
}


class MemoryGame {

    constructor(SqrNum) {

        this.SqrNum = SqrNum;

        this.nextNumber = 1;

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