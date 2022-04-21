const question = document.querySelector(`#question`);
const choices = array.from(document.querySelectorAll(`.choice-text`));
const progressText = document.querySelector(`#progressText`);
const scoreText = document.querySelector(`#score`);
const progressBarFull = document.querySelector(`#progressBarFull`);


let currentQuestion ={}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions ={}

let questions = [
    {
        Questions:`From what language is the @ symbol from?`,
        choice1: `Greek`,
        choice2: `Spanish`,
        choice3: `Latin`,
        choice4: `English`,
        answer: 3,

    },
    {
        Questions:`What tech company is currently not in silicon valley?`,
        choice1: `Tesla`,
        choice2: `IBM`,
        choice3: `Apple`,
        choice4: `Google`,
        answer: 2,

    },{
        Questions:`What was the first virus within the DOS System?`,
        choice1: `Zombie Virus`,
        choice2: `Trojan Worm`,
        choice3: `Brain Virus`,
        choice4: `I love you virus`,
        answer: 3,

    },{
        Questions:`When was the first email sent?`,
        choice1: `1971`,
        choice2: `1969`,
        choice3: `2002`,
        choice4: `1999`,
        answer: 1,

    },{
        Questions:`Who is credited as the first computer programmer?`,
        choice1: `Steve Jobs`,
        choice2: `Ada Lovelace`,
        choice3: `Konrad Zuse`,
        choice4: `Albert Einstein`,
        answer: 2,

    },{
        Questions:`What material is a compute processor made of?`,
        choice1: `Iron`,
        choice2: `Single Crystal Silicon`,
        choice3: `Single Crystal Ruby`,
        choice4: `Silicon Polychrystal`,
        answer: 2,

    },{
        Questions:`What kind of paste is used inside a computer?`,
        choice1: `Thermal Paste`,
        choice2: `Tooth Paste`,
        choice3: `Anti-fungal`,
        choice4: `Silicon`,
        answer: 1,

    },{
        Questions:`What display resolution is full HD?`,
        choice1: `1920x1020`,
        choice2: `3820x3080`,
        choice3: `1920x1080`,
        choice4: `1280x720`,
        answer: 3,

    },{
        Questions:`When older programmers said they had to fix bugs in the code what did they mean?`,
        choice1: `Taking actual bugs out of the code`,
        choice2: `Rewriting the entire code`,
        choice3: `taking simple mistakes out`,
        choice4: `setting the code on fire`,
        answer: 1,

    },{
        Questions:`In 1786 Johann Henrich Von Muller called his written computer on paper what?`,
        choice1: `Difference Engine`,
        choice2: `Computer`,
        choice3: `Desktope`,
        choice4: `Electronic Gift`,
        answer: 1,

    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 10

startGame = () =>{
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}


getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore',score)
    return window.location.assign(`/end.html`)
}
questionCounter++
progressText.innerText= `Question ${questionCounter} of ${MAX_QUESTIONS}`
progressBarFull.style.width=`${(questionCounter/MAX_QUESTIONS) * 100 }%`


const questionsIndex=Math.floor(Math.random() * availableQuestions.length)
currentQuestion = availableQuestions[questionsIndex]
question.innerText = currentQuestion.question

choices.forEach(choice => {
const number= choice.dataset[`number`]    
choice.innerText = currentQuestion[`choice` + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
choice.addEventListener(`click`, e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset[`number`]
    
    let classToApply = selectedAnswer ==currentQuestion.answer ? `correct` : `incorrect`

    if(classToApply === `correct`) {
        incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classlist.add(classToApply)
    setTimeout(()=> {
        selectedChoice.parentElement.classlist.remove(classToApply)
        getNewQuestion()

    }, 1000)
})
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
startGame()