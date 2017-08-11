
var login = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        //document.addEventListener('deviceready', this.validateUser(name, pass), false);
        $(document).ready(function(){
        	var name = $("#name_login").val();
        	var pass = $("#password_login").val();
        	login.validateUser(name, pass)
        	
        });
    },
    
    validateUser: function(username, password){
    		  //get the user token from local storage
    	
	    	$("#login_btn").click(function(){
	    		    if(window.localStorage.getItem('usertoken') === 'null'){
	    		    	//Set up the http request
	    		    	//Se crearan las validaciones en los archivos php del web service.
	    		    	var url = 'http://localhost:8080/tone_analyzer/database/login/login.php'
	    		    	$.getJSON(url, function(result){
	    		    		$.each(result, function(i, field){
	    		    			if(field.name == username){
	    		    				window.localStorage.setItem('usertoken', 'null');
	    		    				alert(window.localStorage.getItem('usertoken'));	    		    				
	    		    			}else{alert("data");}
	    		    		});
	    		    	});      
	    		     }  
	    	});
    }
    
};

login.initialize();
