const buttons = document.querySelectorAll("nav.menu button");
const sections = document.querySelectorAll("main section");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        sections.forEach(sec => sec.classList.add("hidden"));
        document.getElementById(btn.dataset.section).classList.remove("hidden");
    });
});

// QUIZ
const quizData = [
    { question: "Which language powers the structure of web pages?", options: ["HTML", "CSS", "JavaScript", "Python"], answer: "HTML" },
    { question: "Which CSS property controls text size?", options: ["font-size", "text-style", "font-weight", "size"], answer: "font-size" },
    { question: "What does JS stand for?", options: ["JavaStyle", "JavaScript", "JustScript", "JumboScript"], answer: "JavaScript" }
];

const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit-quiz");
const resultDisplay = document.getElementById("quiz-result");

quizData.forEach((q, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<p><b>Q${index + 1}: ${q.question}</b></p>`;
    q.options.forEach(option => {
        div.innerHTML += `<label><input type="radio" name="q${index}" value="${option}"> ${option}</label><br>`;
    });
    quizContainer.appendChild(div);
});

submitBtn.addEventListener("click", () => {
    let score = 0;
    quizData.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === q.answer) score++;
    });
    resultDisplay.textContent = `You scored ${score} out of ${quizData.length}! 🎉`;
});

// CAROUSEL
const carouselImages = [
    "https://picsum.photos/id/1015/600/350",
    "https://picsum.photos/id/1025/600/350",
    "https://picsum.photos/id/1035/600/350",
    "https://picsum.photos/id/1045/600/350"
];

let currentIndex = 0;
const carouselImage = document.getElementById("carousel-image");
document.getElementById("prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    carouselImage.src = carouselImages[currentIndex];
});
document.getElementById("next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    carouselImage.src = carouselImages[currentIndex];
});
setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    carouselImage.src = carouselImages[currentIndex];
}, 4000);

// API FETCH
const jokeBtn = document.getElementById("fetch-joke");
const jokeDisplay = document.getElementById("joke-display");

jokeBtn.addEventListener("click", async () => {
    jokeDisplay.textContent = "Loading joke...";
    try {
        const res = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data = await res.json();
        jokeDisplay.textContent = `${data.setup} - ${data.punchline}`;
    } catch (error) {
        jokeDisplay.textContent = "Failed to fetch joke. Try again!";
    }
});
