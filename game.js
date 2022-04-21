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
        Questions:`What enables a computer to run multiple programs?`,
        choice1: `NIC`,
        choice2: `API`,
        choice3: `OS`,
        choice4: `GUI`,
        answer: 3,

    },
    {
        Questions:`What type of software has a free trial but will require a purchase?`,
        choice1: `shareware`,
        choice2: `opensource`,
        choice3: `microsoft word`,
        choice4: `firefox`,
        answer: 1,

    },{
        Questions:`What does application software allow you to do?`,
        choice1: `restart your computer`,
        choice2: `interacts with the user`,
        choice3: `lets the user preform tasks`,
        choice4: `all of the above`,
        answer: 3,

    },{
        Questions:`What are all the physical computer parts attached to?`,
        choice1: `gpu`,
        choice2: `ram`,
        choice3: `monitor`,
        choice4: `motherboard`,
        answer: 4,

    },{
        Questions:`What is the memory of the computer called?`,
        choice1: `RAM`,
        choice2: `CPU`,
        choice3: `ROM`,
        choice4: `SSD`,
        answer: 1,

    },{
        Questions:`What is the meaning of GUI?`,
        choice1: `Grandma Unplugged Internet`,
        choice2: `Grand Under Inovator`,
        choice3: `Graphical User Interface`,
        choice4: `Graphical User Interpretor`,
        answer: 3,

    },{
        Questions:`What is known as the computers brain?`,
        choice1: `Memory`,
        choice2: `CPU`,
        choice3: `Ram`,
        choice4: `motherboard`,
        answer: 2,

    },{
        Questions:`When was the first computer invented?`,
        choice1: `590`,
        choice2: `1986`,
        choice3: `1967`,
        choice4: `1996`,
        answer: 4,

    },{
        Questions:`What does IBM stand for?`,
        choice1: `Intense Bowling Machine`,
        choice2: `Irrigation Biographical Machines`,
        choice3: `International Computer Machines`,
        choice4: `Intellegent Computer Makers`,
        answer: 3,

    },{
        Questions:`What does IT stand for?`,
        choice1: `Intercepted Telephones`,
        choice2: `Incredible Tacos`,
        choice3: `Infared Technology`,
        choice4: `Information Technology`,
        answer: 4,

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