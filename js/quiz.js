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
        url: "",
        dataType: "json",
        data: {q: quizId},
        success: function(question){
            console.log(question.text)
            document.getElementById("quiz").classList.remove("hidden");
        }
    })
}

function displayQuiz(qText, ansA, ansB, andC, ansD){
    //Display the question text and answers to the html elements
    //no ajax required
}

function verifyQuiz(){
    //make ajax request with q and a para to get a boolean value to verify the answer
}

function updateSideBar(){
    //updates the side bar.  so we need a talley
}