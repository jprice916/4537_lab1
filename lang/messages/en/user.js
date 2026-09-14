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

    window.user = new User();

    document.getElementById("question").textContent =
        user.GetText("question");

    document.getElementById("startButton").textContent =
        user.GetText("startButton");

    // Tell script.js that User is ready
    window.dispatchEvent(new Event("userReady"));
};

document.head.appendChild(stringsScript);