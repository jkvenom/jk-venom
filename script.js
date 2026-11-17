
// JK VENOM - ARSHIA

// 1. Digital Clock
function updateClock() {
    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString("en-GB");
}

setInterval(updateClock, 1000);
updateClock();


// 2. Typing Animation
const messages = [
    "Future Cyber Security Developer",
    "Web Developer",
    "JavaScript Learner",
    "Welcome To JK VENOM"
];

let messageIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const element = document.getElementById("typing");
    const current = messages[messageIndex];

    if (!deleting) {
        element.textContent = current.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeEffect, 1400);
            return;
        }
    } else {
        element.textContent = current.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 90);
}

typeEffect();


// 3. Matrix Rain Effect
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 15;
let drops = [];

function resizeMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.ceil(canvas.width / fontSize);

    drops = Array(columns).fill(1);
}

function drawMatrix() {
    ctx.fillStyle = "rgba(3, 7, 4, 0.09)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#39ff70";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, index) => {
        const letter = letters[
            Math.floor(Math.random() * letters.length)
        ];

        ctx.fillText(
            letter,
            index * fontSize,
            y * fontSize
        );

        if (
            y * fontSize > canvas.height &&
            Math.random() > 0.975
        ) {
            drops[index] = 0;
        }

        drops[index]++;
    });
}

window.addEventListener("resize", resizeMatrix);
resizeMatrix();

setInterval(drawMatrix, 45);


// 4. Interactive Demo Terminal
const input = document.getElementById("command");
const output = document.getElementById("output");

function printLine(message) {
    const p = document.createElement("p");
    p.textContent = message;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
}

const commands = {
    help: [
        "AVAILABLE COMMANDS:",
        "help - Show commands",
        "about - About Arshia",
        "skills - Show skills",
        "date - Show current date",
        "status - Demo system status",
        "clear - Clear terminal"
    ],

    about: [
        "USER: ARSHIA",
        "PROJECT: JK VENOM",
        "INTEREST: PROGRAMMING & CYBER SECURITY"
    ],

    skills: [
        "HTML - LEARNING",
        "CSS - LEARNING",
        "JAVASCRIPT - LEARNING",
        "CYBER SECURITY - LEARNING"
    ],

    status: [
        "JK VENOM DEMO: ONLINE",
        "TERMINAL: READY",
        "MODE: SAFE SIMULATION"
    ],

    date: [
        "DATE: " + new Date().toLocaleDateString()
    ]
};

input.addEventListener("keydown", function(event) {
    if (event.key !== "Enter") return;

    const command = input.value.trim().toLowerCase();

    if (!command) return;

    printLine("visitor@jkvenom:~$ " + command);

    if (command === "clear") {
        output.textContent = "";
    } else if (commands[command]) {
        commands[command].forEach(printLine);
    } else {
        printLine("Unknown command. Type help.");
    }

    input.value = "";
});
