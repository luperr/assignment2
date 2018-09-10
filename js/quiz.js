//global varibles
var quizIdArray = [];
var qTotal = 0;
var qCorrect = 0;
var qIncorrect = 0;
var currentQuizId = quizIdArray[0];

$(function(){
    getQuizId();
})
window.addEventListener("load", function(e){
	document.getElementById("quiz").addEventListener("submit", validateQuiz);
});


function getQuizId(){
    //make an ajax call with no params to get a list of quiz ID's
    //store those IDs in a variable
    $.ajax({
        method: "GET",
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
        dataType: "json",
        success: function(data){
            data.questions.forEach(function(e) {        
                quizIdArray.push(e);        
            });
            getQuizConetent(data.questions[0]);           
        },
        error: function(data){
            alert(data.error);
        },
    });
}

function getQuizConetent(quizId){
    //make an ajax call with the q= param.  Returns question text + answer options
    //call displayQuiz() with returned params
    $.ajax({
        method: "POST",
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
        dataType: "json",
        data: {q: quizId},
        success: function(data){
            displayQuiz(data.text, data.choices.A, data.choices.B, data.choices.C, data.choices.D);
        }
    })
}

function displayQuiz(qText, ansA, ansB, ansC, ansD){
    //Display the question text and answers to the html elements
    console.log(ansA)
    document.getElementById("quiz_question").textContent=qText;
    $("label[for='answer_a']").text(ansA);
    $("label[for='answer_b']").text(ansB);
    $("label[for='answer_c']").text(ansC);
    $("label[for='answer_d']").text(ansD);
    document.getElementById("quiz").classList.remove("hidden");
}

function validateQuiz(e){
    e.preventDefault();
    var answer = $('input[name=answer]:checked').val();
    console.log(answer)
    var success = true;
    //make ajax request with q and a para to get a boolean value to verify the answer
    $.ajax({
        method: "POST",
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
        dataType: "json",
        data: {q: quizIdArray[0], a: answer},
        success: function(data){
            qTotal += 1;
            if(data.correct){
                qCorrect += 1;
            } else {
                qIncorrect += 1;
            }
            updateSideBar();
            
            return success;
        },
        error: function(data){
            alert(data.error);
        },
    });
}

function updateSideBar(){
    //updates the side bar.  so we need a talley
    document.getElementById("score").classList.remove("hidden");
    document.getElementById("attempted").innerHTML="Attempted: " + qTotal;
    document.getElementById("correct").innerHTML="Correct: " + qCorrect;
    document.getElementById("incorrect").innerHTML="incorrect: " + qIncorrect;
}