if(localStorage.getItem("userName") == null){
            localStorage.setItem("userToken", 'null');
            localStorage.setItem("userName", 'null');
            localStorage.setItem("userId", 'null');
        }
        if (localStorage.getItem("userToken") == 'null'){
                /*alert("userName "+ localStorage.getItem("userName") +
            "userId "+ localStorage.getItem("userId") +
            "userToken "+ localStorage.getItem("userToken") );*/
            window.location.replace("login/user_login.html");
        }
        window.alert = function(){};
        var defaultCSS = document.getElementById('bootstrap-css');
        function changeCSS(css){
            if(css) $('head > link').filter(':first').replaceWith('<link rel="stylesheet" href="'+ css +'" type="text/css" />'); 
            else $('head > link').filter(':first').replaceWith(defaultCSS); 
        }
        $( document ).ready(function() {
          var iframe_height = parseInt($('html').height()); 
          window.parent.postMessage( iframe_height, 'https://bootsnipp.com');
          
          //Poner nombre del usuario en el menu
          $("#user_option").append(" "+localStorage.getItem("userName")+" .");
          
          //Ir a la pantalla de lista de restaurantes
          $("#ULP").on("click", ".Lista_Rest", function(event){
                console.log('clickess   d');
                $("#Iframe_Control").attr('src',"restaurantes/restaurantes.html");
            });
          
        //Ir a la pantalla de lista de recomendaciones
          $("#ULP").on("click", ".Lista_Rec", function(event){
                console.log('clickess   d');
                $("#Iframe_Control").attr('src',"restaurantes/recomendaciones/recomendaciones.html");
            });
          
          //Ir a la pantalla principal
          $("#ULP").on("click", ".active", function(event){
            console.log('clickess   home');
            $("#Iframe_Control").attr('src',"restaurantes/map.html");
        });
          
        //Ir al perfil de usuario
          $("#ULP_user").on("click", ".perfir", function(event){
              $("#Iframe_Control").attr('src',"user/user.html");
            });
        
          //cerrar session
          $("#ULP_user").on("click", ".cerrarsession", function(event){
                console.log('clickess   cerrarsession');
                localStorage.setItem("userToken", 'null');
                localStorage.setItem("userName", 'null');
                localStorage.setItem("userId", 'null');
                window.location.replace("login/user_login.html");
            });
          
        //desvincular cuenta
          $("#ULP_user").on("click", ".desvincular", function(event){
                 var id = localStorage.getItem("userId");
                 var dataString="id="+id+"&delete=";
                 //alert(dataString);
                 $.ajax({
                     type: "POST",
                     url:"http://35.192.11.211/Restaurant_Recomend/database/user_management/delete.php",
                     data: dataString,
                     crossDomain: true,
                     cache: false,
                     beforeSend: function(){},
                     success: function(data){
                         if(data=="success"){
                            localStorage.setItem("userToken", 'null');
                            localStorage.setItem("userName", 'null');
                            localStorage.setItem("userId", 'null');
                            window.location.replace("login/user_login.html");
                         }
                         else if(data=="error"){
                            alert("error de delete");
                         }
                     }
                 });
            });
          
        });