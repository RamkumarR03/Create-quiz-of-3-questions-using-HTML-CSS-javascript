const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Lisbon",
        correct: "c"
    },
    {
        question: "Who is the CEO of Tesla?",
        a: "Jeff Bezos",
        b: "Elon Musk",
        c: "Bill Gates",
        d: "Tony Stark",
        correct: "b"
    },
    {
        question: "What is the most used programming language in 2021?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d"
    }
];

const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const answerEls = document.querySelectorAll('.answer');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    // Remove existing event listeners
    answerEls.forEach(answerEl => {
        const newAnswerEl = answerEl.cloneNode(true);
        answerEl.parentNode.replaceChild(newAnswerEl, answerEl);
    });

    // Add event listeners to each option
    document.querySelectorAll('.answer').forEach(answerEl => {
        answerEl.addEventListener('change', () => {
            checkAnswer(answerEl);
        });
    });
}

function deselectAnswers() {
    document.querySelectorAll('.answer').forEach(answerEl => {
        answerEl.checked = false;
        answerEl.parentElement.classList.remove('correct', 'incorrect');
        answerEl.disabled = false;
    });
}

function getSelected() {
    let answer;
    document.querySelectorAll('.answer').forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function checkAnswer(selectedAnswerEl) {
    const answer = selectedAnswerEl.id;
    if (answer === quizData[currentQuiz].correct) {
        selectedAnswerEl.parentElement.classList.add('correct');
    } else {
        selectedAnswerEl.parentElement.classList.add('incorrect');
        document.getElementById(quizData[currentQuiz].correct).parentElement.classList.add('correct');
    }

    // Disable further selection
    document.querySelectorAll('.answer').forEach(answerEl => {
        answerEl.disabled = true;
    });
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});
