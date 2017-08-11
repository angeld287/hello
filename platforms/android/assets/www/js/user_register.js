function star(){
	$(document).ready(function(){
		 $("#insert").click(function(){
			 var url="http://localhost/tone_analyzer/database/user_management/user_data_valid.php";
				//ajax method
				 var name=$("#name").val();
				 var email=$("#email").val();
				 //validando si el usuario existe
				alert("datw "+name+email);
				 $.getJSON(url,function(result){
					 $.each(result, function(i, field){
						 var email_found=field.email;
						 var name_found=field.name;
						 if(name == name_found){
							 //$("#name").effect("shake");
							 //$("#name_validation").val('yes');
			        		 //$("#div_name").append('<input type="text" id="name_validation" value="none"/>');
							 alert("Verifyduplicateuser4");
							 register.bindEvents(name,email,true);
							 //GetJsonData(0);
			        		 return false;
						 }
						// $("#div_name").append('<input type="text" id="name_validation" value="yes"/>');
						 //GetJsonData(1);
						 return true;
					 });
				 });
				 register.bindEvents(name,email,false);
		 });
	});
}

var register = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function(name,email,user_exist) {
        //document.addEventListener('deviceready', this.onDeviceReady, false);
        $(document).ready(function()
        		 {
        		 //$("#insert").click(function(){
        			 var password=$("#password").val();
        			 var password_verify=$("#password_verify").val();
        			 var dataString="name="+name+"&email="+email+"&password="+password+"&insert=";
        			 
        			 //El sistema no permite el ingreso si faltan campos obligatorios para el registro.
        			 if($.trim(name).length>0 & $.trim(email).length>0 & $.trim(password).length>0 & $.trim(password_verify).length>0)
		        		 {
        				 	if(register.EmailValidate(email) && register.PasswordValidate(name, password, password_verify) && !user_exist){
        				 		
        						$.ajax({
        			   	   	   		 type: "POST",
        			   	   	   		 url: "http://localhost/tone_analyzer/database/user_management/register.php",
        			   	   	   		 data: dataString,
        			   	   	   		 crossDomain: true,
        			   	   	   		 cache: false,
        			   	   	   		 beforeSend: function(){ $("#insert").val('Connecting...');},
        			   	   	   		 success: function(data){
        			   	   	   			 if(data=="success"){
        			   	   	   				 	window.location.replace("../UC002-login/login.html");
        			   	   	   				 }
        			   	   	   				 else if(data=="error"){
        			   	   	   					 alert("error");
        			   	   	   				 }
        			   	   	   			 }
        			   	   	   		 });
        				 		}
        				 	else
        				 		{
        				 			//mensaje de validacion
        				 			alert("error 3");
        				 		}
				        	}else{
				        		 $("#password_verify").effect("shake");
				        		 $("#password_verify").css("border","solid 1px #DC143C");
				        	}
        			 	return false;
		        		 //});
	        		 });
    },
    
    EmailValidate: function(email_value){
    	 if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email_value))
    	 	{
    		   return true;
    		} 
    	 	else 
    		{
    			alert("el correo esta mal");
    			return false;
    		}
    },
    
    Verifyduplicateuser: function(name, email){
    	  	 
    },
        
    PasswordValidate: function(name, pass1, pass2){
    	if(pass1 != "" && pass1 == pass2) {
    		if(pass1.length < 6) {
    	        alert("Error: Password must contain at least six characters!");
    	        //$("#password_verify").focus();
    	        return false;
    	      }
    		else if(pass1 == name) {
    	        alert("Error: Password must be different from Username!");
    	        pass1.focus();
    	        return false;
    	      }
    		else
    		{
    			return true;
    		}
    		//re = /[0-9]/;
  	      	//if(!re.test(pass1)) {
  	      	//	alert("Error: password must contain at least one number (0-9)!");
  	      	//	pass1.focus();
  	      	//	return false;
  	      	//}
  	      	//re = /[a-z]/;
  	      	//if(!re.test(pass1)) {
  	      	//	alert("Error: password must contain at least one lowercase letter (a-z)!");
  	      	//	pass1.focus();
  	      	//	return false;
  	      	//}
  	      	//if(!re.test(pass1)) {
  	      	//	alert("Error: password must contain at least one uppercase letter (A-Z)!");
  	      	//	pass1.focus();
  	      	//	return false;
  	      	//}
    	}else{
    		alert("validacion de contrasenia");
    		//$( "#password_verify" ).effect( "shake" );
    	}
    }
};

function GetJsonData(value){
	if(value == 1){
		window.localStorage.setItem('UserExist', '1');
		//alert("1");
		return true;
		}
	else if(value == 0){
		window.localStorage.setItem('UserExist', '0');
		//alert(window.localStorage.getItem('UserExist'));
		//alert("0");
		return false;
		}
}

star();
