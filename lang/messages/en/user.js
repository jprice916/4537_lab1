const stringsScript = document.createElement("script");

stringsScript.src = "./lang/strings.js";

stringsScript.onload = function () {

    class User {

        constructor() {
            this.strings = Strings;
        }

        GetText(name) {
            return this.strings[name];
        }
    }

    // Create the User object
    window.user = new User();

    // Set HTML text
    document.getElementById("question").textContent =
        user.GetText("question");

    document.getElementById("startButton").textContent =
        user.GetText("startButton");

    // Tell script.js that User is ready
    window.dispatchEvent(new Event("userReady"));
};

document.head.appendChild(stringsScript);