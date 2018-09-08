$.ajax({
    method: "GET",
    url: "http://turing.une.edu.au/~jbisho23/assignment2/quiz.php",
    dataType: "json",
    success: function(data){
        console.log(data.q)
        $.ajax({
            method: "POST",
            url: "",
            dataType: "json",
            data: {q: data.questions},
            success: function(question){
                console.log(question.text)
            }
        })
    },
    error: function(data){
        alert(data.error);
    },
});

var quizIdArray = 0;

function getQuizId(){
    //make an ajax call with no params to get a list of quiz ID's
    //store those IDs in a variable
}

function getQuizConetent(quizId){
    //make an ajax call with the q= param.  Returns question text + answer options
    //call displayQuiz()
}

function displayQuiz(qText, ansA, ansB, andC, ansD){

}

function verifyQuiz(){

}

function updateSideBar(){

}