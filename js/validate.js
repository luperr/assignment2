window.addEventListener("load", function(e){
	document.getElementById("registration").addEventListener("submit", validate);
});

function clearErrors(){
	document.getElementById("user_message").innerHTML = "";
	document.getElementById("user_message").style.visibility = "hidden";
}

function addError(message){
	var p = document.createElement("p");
	var text = document.createTextNode(message);
	document.getElementById("user_message").style.visibility = "visible";
	p.appendChild(text);
	document.getElementById("user_message").appendChild(p);
}

function validate(e){
	e.preventDefault();
	clearErrors();
	
	var success = true;
	var form = document.getElementById("registration");

	var name = form.elements["name"].value;
	if (name.length === 0 || (name.length <= 2  || name.length >= 100)){
		addError("Please Enter a valid name.");
		success = false;
	} else if (!/^[a-zA-Z'-]+$/.test(name)
	){
		success = false;
		addError("Please only use characters or hyphens");
	}

	var age = form.elements["age"].value;
	var age_int = Number(age)
	if(age.length === 0 || age_int <= 13 || age_int >= 130 || !/^[0-9]+$/.test(age)){
		success = false;
		addError("Age must be a number greater than 13 or less than 130");
	}

	var email = form.elements["email"].value;
	if(email.length === 0 || !/^[a-zA-Z-]([\w-.]+)?@([\w-]+\.)+[\w]+$/.test(email)){
		success = false;
		addError("Please enter a valid email address");
	}

	var mobile = form.elements["phone"].value;
	if((mobile.length < 10 || mobile.length > 10 || !/^04/.test(mobile) || !/^[0-9]*$/.test(mobile)) && mobile.length !== 0){
		success = false;
		addError("Phone numbers must be 10 digits long and start with 04");
	}
	
	if(success){

	$.ajax({
		method: "POST",
		url: "http://turing.une.edu.au/~jbisho23/assignment2/register.php",
		dataType: "json",
		data: {name: name, age:age, email: email, phone: mobile},
		success: function(data){
			document.getElementById("user_id").innerHTML = data.user_id
		},
		error: function(data){
			alert(data.error);
		},
	});	
	document.getElementById("registration").style.visibility = "hidden";
	document.getElementById("quiz").style.visibility = "visible";

}
	return success;
}

