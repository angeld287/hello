$(document).ready(function(){
	$( "#registrationForm" ).submit(function( event ) {
		
		var name=$("#name").val();
		var email=$("#email").val();
		var password=$("#password").val();
		
		var dataString="name="+name+"&email="+email+"&password="+password+"&insert=";
		
				$.ajax({
	   	   		 type: "POST",
	   	   		 url: "http://localhost/tone_analyzer/database/user_management/register.php",
	   	   		 data: dataString,
	   	   		 crossDomain: true,
	   	   		 cache: false,
	   	   		 beforeSend: function(){ $("#submit-button").val('Connecting...');},
	   	   		 success: function(data){
	   	   			 if(data=="success"){
	   	   				 	alert('login');
	   	   				 	window.location.replace("../UC002-login/login.html");
	   	   				 }
	   	   				 else if(data=="error"){
	   	   					 alert("error");
	   	   				 }
	   	   			 }
	   	   		 });
	});
});