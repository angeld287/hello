if (!(localStorage.getItem("userName") == 'null')){
			window.location.replace("../index.html");
}
$(function(){	
	$("#loginForm").validate({
		rules:{
			name:{
				required: true
			},
			password: {
				required: true
			}
		},
		messages:{
			password:{
				required: 'este campo es requerido'
			},
			name:{
				required: 'este campo es requerido'
			}
		},
		submitHandler: function(){
			$("#submit-button").click(function(){
				if($("#loginForm").valid()) {
					var name=$("#name").val();
					var password=$("#password").val();
					var url = 'http://35.192.11.211/Restaurant_Recomend/database/login/login.php'
					var dataString="name="+name+"&password="+password;
					//alert(dataString);
					$.ajax({
						type: "GET",
						url: url,
						data: dataString,
						dataType: "json",
						crossDomain: true,
						cache: false,
						beforeSend: function(){},
						success: function(result){
									//alert(result);
									if(result == 0){
										alert("Usuario o clave invalidos");
										
									}else {
										$.each(result, function(i, field){
											//alert(field.name+" == "+ name +" && "+field.email+" == "+name);
											if(field.name == name || field.email == name){
												localStorage.setItem("userToken", field.password+field.name+field.id);
												localStorage.setItem("userName", field.name);
												localStorage.setItem("userId", field.id);
												/*alert("userName "+ localStorage.getItem("userName") +
												"userId "+ localStorage.getItem("userId") +
												"userToken "+ localStorage.getItem("userToken") );*/
												window.location.replace("../index.html");
											}
										});
										//alert(result);
									}
							 	},
						error: function(request, status, error){
									alert(request.responseText+" | "+status+" | "+error);
								}
					});
				}
			});
					
		}
	});
});