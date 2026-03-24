let allQuestions = [];
let filtered = [];
let current = 0;
let selectedChoice = null;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const revealBtn = document.getElementById("revealBtn");
const answerBox = document.getElementById("answerBox");
const answerText = document.getElementById("answerText");
const factText = document.getElementById("factText");
const nextBtn = document.getElementById("nextBtn");

const categoryButtons = document.querySelectorAll(".category-btn");

// LOAD DATA
fetch("facts.json")
  .then(res => res.json())
  .then(data => {
    allQuestions = data;
    filtered = [...allQuestions];
    render();
  });

// RENDER QUESTION
function render() {
  const q = filtered[current];
  selectedChoice = null;

  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";

  q.choices.forEach(choice => {
    const li = document.createElement("li");
    li.textContent = choice;

    li.addEventListener("click", () => {
      if (answerBox.classList.contains("hidden")) {
        document.querySelectorAll(".choices li").forEach(el => el.classList.remove("selected"));
        li.classList.add("selected");
        selectedChoice = choice;
      }
    });

    choicesEl.appendChild(li);
  });

  answerBox.classList.add("hidden");
  nextBtn.classList.add("hidden");
}

// REVEAL
revealBtn.addEventListener("click", () => {
  const q = filtered[current];

  const allLi = document.querySelectorAll(".choices li");

  allLi.forEach(li => {
    if (li.textContent === q.answer) {
      li.classList.add("correct");
    } else if (li.textContent === selectedChoice) {
      li.classList.add("wrong");
    }
  });

  answerText.innerHTML = `<strong>Answer:</strong> ${q.answer}`;
  factText.textContent = q.fact;

  answerBox.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
});

// NEXT
nextBtn.addEventListener("click", () => {
  current = (current + 1) % filtered.length;
  render();
});

// CATEGORY FILTER
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".category-btn.active").classList.remove("active");
    btn.classList.add("active");

    const cat = btn.dataset.category;

    if (cat === "All") {
      filtered = [...allQuestions];
    } else {
      filtered = allQuestions.filter(q => q.category === cat);
    }

    current = 0;
    render();
  });
});
