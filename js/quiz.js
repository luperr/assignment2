//global varibles
var quizIdArray;
var qTotal = 0;
var qCorrect = 0;
var qIncoorect = 0;

$(function(){
    getQuizId();
})

function getQuizId(){
    //make an ajax call with no params to get a list of quiz ID's
    //store those IDs in a variable
    $.ajax({
        method: "GET",
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
        dataType: "json",
        success: function(data){
            console.log(data.q)
            getQuizConetent(data.q);           
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
            console.log(data.text);
            displayQuiz(data.text, data.choices.A, data.choices.B, data.choices.C, data.choices.D);
        }
    })
}

function displayQuiz(qText, ansA, ansB, ansC, ansD){
    //Display the question text and answers to the html elements
    document.getElementById("quiz_question").textContent=qText;
    document.getElementById("answer_a").textContent=ansA;
    document.getElementById("answer_b").textContent=ansB;
    document.getElementById("answer_c").textContent=ansC;
    document.getElementById("answer_d").textContent=ansD;
    document.getElementById("quiz").classList.remove("hidden");
}

function verifyQuiz(qId, answer){
    //make ajax request with q and a para to get a boolean value to verify the answer
    $.ajax({
        method: "POST",
        url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
        dataType: "json",
        data: {q: qId, a: answer},
        success: function(data){
            console.log(data.q)
            getQuizConetent(data.q);           
        },
        error: function(data){
            alert(data.error);
        },
    });
}

function updateSideBar(){
    //updates the side bar.  so we need a talley
}