const questions = [
    { subject: "Science", question: "What gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide", hint: "It's essential for photosynthesis." },
    { subject: "Technology", question: "What does CPU stand for?", options: ["Central Processing Unit", "Control Program Unit", "Central Programming Unit", "Computer Processing Utility"], answer: "Central Processing Unit", hint: "It's the brain of the computer." },
    { subject: "Engineering", question: "What material is commonly used for electrical wiring?", options: ["Aluminum", "Copper", "Iron", "Plastic"], answer: "Copper", hint: "It's known for high conductivity." },
    { subject: "Math", question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8", hint: "It's an even number between 7 and 9." }
];

let score = 0;
let questionsAnswered = 0;
let timer;
let currentHint = "";
let highScore = localStorage.getItem("highScore") || 0;

document.getElementById("high-score").innerText = `High Score: ${highScore}`;

function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-area").style.display = "block";
    generateShapes();
    startTimer();
}

function generateShapes() {
    const container = document.getElementById("shapes-container");
    container.innerHTML = "";

    const subjectsInOrder = ["Science", "Technology", "Engineering", "Math"];
    subjectsInOrder.forEach(subject => {
        let shape = document.createElement("div");
        shape.classList.add("shape");

        if (subject === "Science") shape.classList.add("circle");
        else if (subject === "Technology") shape.classList.add("triangle");
        else if (subject === "Engineering") shape.classList.add("hexagon");
        else if (subject === "Math") shape.classList.add("square");

        shape.innerText = subject.charAt(0);
        shape.onclick = () => {
            shape.style.pointerEvents = "none";
            askQuestion(subject, shape);
        };
        container.appendChild(shape);
    });
}

function askQuestion(subject, shapeElement) {
    if (questionsAnswered >= 4) return;

    let questionData = questions.find(q => q.subject === subject);
    currentHint = questionData.hint;
    displayQuestion(questionData, shapeElement);
}

function displayQuestion(questionData, shapeElement) {
    document.getElementById("question-area").style.display = "block";
    document.getElementById("question-text").innerText = questionData.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    questionData.options.forEach(option => {
        let optionBtn = document.createElement("div");
        optionBtn.classList.add("option");
        optionBtn.innerText = option;
        optionBtn.onclick = () => checkAnswer(option, questionData.answer, shapeElement);
        optionsContainer.appendChild(optionBtn);
    });
}

function showHint() {
    alert(`Hint: ${currentHint}`);
}

function checkAnswer(selected, correctAnswer, shapeElement) {
    if (selected === correctAnswer) {
        score += 5;
        showFeedback("😊 Correct!", "green");
        blinkEffect(shapeElement, "lightgreen");
    } else {
        showFeedback("😢 Incorrect!", "red");
        blinkEffect(shapeElement, "red");
    }

    questionsAnswered++;
    updateProgress();
    document.getElementById("score").innerText = `Score: ${score} / 20`;

    if (questionsAnswered === 4) {
        clearInterval(timer);
        setTimeout(() => {
            endGame();
        }, 500);
    }
}

function blinkEffect(element, color) {
    let blinkCount = 0;
    let interval = setInterval(() => {
        element.style.backgroundColor = blinkCount % 2 === 0 ? color : "white";
        blinkCount++;
        if (blinkCount > 5) clearInterval(interval);
    }, 200);
}

function showFeedback(message, color) {
    const feedback = document.getElementById("feedback");
    feedback.innerHTML = message;
    feedback.style.color = color;
}

function updateProgress() {
    let progress = (questionsAnswered / 4) * 100;
    document.getElementById("progress").style.width = `${progress}%`;
}

function startTimer() {
    let timeLeft = 15;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up!");
            endGame();
        }
    }, 1000);
}

function endGame() {
    if (score > highScore) {
        localStorage.setItem("highScore", score);
        alert("🎉 New High Score!");
    }
    document.getElementById("game-area").innerHTML = `
        <h2>Game Over!</h2>
        <p>Your total score is: ${score} / 20</p>
        <h3>Thank You for Participating!</h3>
    `;
}
