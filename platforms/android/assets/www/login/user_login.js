/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler

    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.

    onDeviceReady: function() {
        if (!(localStorage.getItem("userName") == 'null')){
            window.location.replace("../inicio/inicio.html");
        }else{
            $(document).ready(function() {
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
                                                            window.location.replace("../inicio/inicio.html");
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
        }
    },

};

app.initialize();