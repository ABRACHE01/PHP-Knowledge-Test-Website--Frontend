const questionNumber = document.querySelector(".qustion-number");
const questionText = document.querySelector(".qustion-text");
const optionContainer = document.querySelector(".option-container");
const answerIndecatorContainer = document.querySelector(".answers-indicator");
const quizBox = document.querySelector(".quiz-Box");
const resultBox = document.querySelector(".result-Box");

let questionCounter=0;
let currentQuestion;
let availableQestions =[];
let availableOptions =[];
let correntAnswers =0;
let attempt =0;

//set quistions available in the data app 
function setAvailableQuestions(){

    const totalQuestion = quiz.length;

    for(let i=0;i<totalQuestion;i++){

        availableQestions.push(quiz[i])
    }
    
}


function  getNewQuestion(){

   //counter of quistiond 
    questionNumber.innerHTML = "Question "+ (questionCounter+1)+" of "+ quiz.length;


    const questionIndex= availableQestions[Math.floor(Math.random()*availableQestions.length)];

     currentQuestion=questionIndex;

    questionText.innerHTML = currentQuestion.q;
    const index1= availableQestions.indexOf(questionIndex);
    availableQestions.splice(index1,1);

    

    //get the length of options
    const optionLen = currentQuestion.option.length;
    for( let i=0; i<optionLen ;i++){

        availableOptions.push(i)
    }

    document.querySelector(".option-container").innerHTML="";

    for( let i=0; i< optionLen ; i++){
        // Text.innerText=""
      const option = document.createElement("button");
      option.innerHTML = currentQuestion.option[i];
      option.id= i;
      option.className="carts";
      optionContainer.appendChild(option);
      option.setAttribute("type","button");
      option.setAttribute("onclick","getResult(this)"); 
    }
    questionCounter++
}

//get the answer of current attempt question
function getResult(element){

    const id = parseInt(element.id);
    // const id = element.id;
    // console.log(typeof id);

    //get the answer by compiring the id of clicked option
    if (id === currentQuestion.answer){
        //set the green color to the current option
        element.classList.add("correct");
        updateAnswerIndecator("correct");
        correntAnswers ++; 
        // console.log( "correct:"+ correntAnswers)
    }else{

        //set the red color to inccorect options
        element.classList.add("wrong");
        updateAnswerIndecator("wrong");

        //if the anser id 
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
    if(parseInt(optionContainer.children[i].id) === currentQuestion.answer ){
                optionContainer.children[i].classList.add("correct");
            }
        }


      
    }
    attempt++;
    unclickableOption();  
}

// make the buttons unclicble after the choice 
function  unclickableOption(){

    const optinLen = optionContainer.children.length;

    for( let i=0 ;i<optinLen;i++ ){

        optionContainer.children[i].classList.add("allready_answered");
    }

} 

//ceat cercle indecators 
function answerIndecator(){

    const totalQuestion = quiz.length;

    for(let i=0 ; i<totalQuestion ;i++){
        const indicator = document.createElement("div");
        answerIndecatorContainer.appendChild(indicator);
    }
   
}

//this function adds to the the button answers the style eather wrong or correct

 // marktype: correct or wrong 

function updateAnswerIndecator(marktype){

    answerIndecatorContainer.children[questionCounter-1].classList.add(marktype);

}

//functin to move to the next quistion
function next(){

    if (questionCounter === quiz.length){
        quizOver();
    }else{
        getNewQuestion();
    }

}

// i used this to show the result page 
function quizOver(){
    //hide quiz page
    quizBox.classList.add("hide");

    //show quiz page
    resultBox.classList.add("remove");
    quizResult();
}

//this function is responsible of showing the result statistics
function quizResult(){

    //showing the stepper result
    const element = document.getElementById('Resault');
         element.setAttribute('class', 'active');

    // result
    resultBox.querySelector(".total-quistion").innerHTML= quiz.length;
    resultBox.querySelector(".total-score").innerHTML=correntAnswers*20+" pts";
    const percentage = (correntAnswers/quiz.length)*100;
    resultBox.querySelector(".total-percentage").innerHTML= percentage.toFixed()+"%";
    resultBox.querySelector(".total-correct").innerHTML=correntAnswers;
    resultBox.querySelector(".total-wrong").innerHTML=attempt-correntAnswers;
   
}

//counts the timming of eache quistion starting from 30s 
function timeCount(){
   var timeLeft = 30;
    var elem = document.getElementById('timer');
    
    var timerId = setInterval(countdown, 1000);
    
    function countdown() {

      if (timeLeft == -1) {
        clearTimeout(timerId);
       next();
      } else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
      }
    }
}

// execute js fanctions 
window.onload = function(){
    timeCount();
    
    setAvailableQuestions();

    getNewQuestion();

    answerIndecator();
   
   
}



