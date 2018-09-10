//global varibles
var quizIdArray = [];
var qTotal = 0;
var qCorrect = 0;
var qIncorrect = 0;
var currentQuizId = 0;

$(function(){
    getQuizId();
})
window.addEventListener("load", function(e){
	document.getElementById("quiz").addEventListener("submit", validateQuiz);
});
//Request quiz ID's and append them to an array.
function getQuizId(){
    $.ajax({
        method: "GET",
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
        dataType: "json",
        success: function(data){
            if(quizIdArray.length === 0){
                data.questions.forEach(function(e) {        
                    quizIdArray.push(e);        
                });
            }
            if(qTotal < quizIdArray.length){
            currentQuizId = quizIdArray[qTotal];  
            getQuizConetent(data.questions[qTotal]);
            }    
        },
        error: function(data){
            alert(data.error);
        },
    });
}
//using q param from getQuizId() get the quiz body
function getQuizConetent(quizId){
    $.ajax({
        method: "POST",
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
        dataType: "json",
        data: {q: currentQuizId},
        success: function(data){
            displayQuiz(data.text, data.choices.A, data.choices.B, data.choices.C, data.choices.D);
        }
    })
}
//Use returned data from getquizContent() and display them
function displayQuiz(qText, ansA, ansB, ansC, ansD){
    document.getElementById("quiz_question").textContent=qText;
    $("label[for='answer_a']").text(ansA);
    $("label[for='answer_b']").text(ansB);
    $("label[for='answer_c']").text(ansC);
    $("label[for='answer_d']").text(ansD);
}
//validate the input and adjust vars before sending request to the sever
function validateQuiz(e){
    e.preventDefault();
    var answer = $('input[name=answer]:checked').val();
    var success = true;
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
            getQuizId();
            return success;
        },
        error: function(data){
            alert(data.error);
        },
    });
}
//Displays stats in the side bar
function updateSideBar(){
    document.getElementById("score").classList.remove("hidden");
    document.getElementById("attempted").innerHTML="Attempted: " + qTotal;
    document.getElementById("correct").innerHTML="Correct: " + qCorrect;
    document.getElementById("incorrect").innerHTML="incorrect: " + qIncorrect;
}