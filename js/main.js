var pacient;

pacient={address: "Calle 162 n 55c-20",
birthdate: 24,
eps: "Famisanar",
error: false,
id: "1049619358",
name: "Andres Castellanos",
sex: "hom",
typeid: "C.C"};

//login


$( document ).on( "pageinit", "#login", function() {

	var windowHeight=$(window).height();
	var contentHeight=$("#login [data-role='content']").height();
	var	padding=parseInt($("#login [data-role='content']").css("padding-top"));
	$("#login [data-role='content']").height(windowHeight-padding-padding+'px');



	$("#loginForm").validationEngine('attach',
		{ajaxFormValidationMethod:"post",promptPosition : "topRight:-100", scroll: false, onValidationComplete: function(form, status){
			if (status) {
				
				login();

			};
		}
	});


});



function login(){


	var dataPost={};

    $("#loginForm input").each(function(index,element){

        dataPost[element.name]=$(element).val();
    });
    dataPost.pass=CryptoJS.SHA256(dataPost.pass).toString(CryptoJS.enc.Base64);
    $.post(server+"users/login", dataPost, function(response) {
        response = jQuery.parseJSON(response);

        if (!response.error) {

        	localStorage.setItem("id",response.id);
        	localStorage.setItem("name",response.name);
        	localStorage.setItem("username",response.username);
        	localStorage.setItem("session_id",response.sessionId);
        	localStorage.setItem("rol",response.rol);

            $("#loginForm").validationEngine('detach');
            changePage("#search");
            

        }else{

         customAlert(response.message);

        }




    });

}


//search pacient \select pacient



$( document ).on( "pageinit", "#search", function() {
  $("#searchForm").validationEngine('attach',
    {promptPosition : "topRight:-100", scroll: false, onValidationComplete: function(form, status){
      if (status) {

        
        var id=$(form).find("input").val();
        searchId(id);

      };
    }
  });
});




function searchId(id){

    var dataPost={
        session_id:localStorage.getItem("session_id"),
        username:localStorage.getItem('username'),
        idpacient:id,

    };

    $.post(server+"pacients/getPacient", dataPost, function(response) {
    
        response = jQuery.parseJSON(response);
        console.log(response);

        if (!response.error) {

            response.birthdate=getAge(response.birthdate);

            $("#pacients").html('<ul data-role="listview" data-inset="true">'+
                '<li data-role="list-divider">'+
                //'<span class="ui-li-count">'+response.id+'</span>
                '</li>'+
                '<li><a idpacient="'+response.id+'" href="#history"><h2>'+
                response.name+
                '</h2>'+
                '<p><strong>'+
                response.typeid+': '+response.id+
                '</strong></p>'+
                '<p>'+
                'EPS: '+response.eps+
                '</p>'+
                '<p class="ui-li-aside"><strong>'+
                response.birthdate+' Años'+
                '</strong></p>'+
                '</a></li>');
            $("#pacients ul").listview();
            pacient=response;
        }else{

            $("#pacients").html('<h3>'+
                response.message+
                '</h3>'+

                '<a href="#registerPacient" class="formLeft ui-btn ui-mini " id="registerButton" onclick="carryDataRegister('+id+')">Registrar</a>');






        }
    });
}

function carryDataRegister(id){

    $("#registerid").val(id);
}



$( document ).on( "pageinit", "#registerPacient", function() {
  $("#registerForm").validationEngine('attach',
    {promptPosition : "topRight:-100", scroll: false, onValidationComplete: function(form, status){
      if (status) {
        
        registerServer(form);

      };
    }
  });
});


function registerServer(form){


    var dataPost={
        session_id:localStorage.getItem("session_id"),
        username:localStorage.getItem('username'),
    };



    $(form).find("input,select").each(function(index, input) {

       dataPost[input.name.replace("register","")] = input.value;
     });

    $.post(server+"pacients/registerPacient", dataPost, function(response) {

        response = jQuery.parseJSON(response);
        response.birthdate=getAge(response.birthdate);
        pacient=response;
        changePage("#history");

    }); 
}



$( document ).on( "pageinit", "#history", function() {
  $("#searchForm").validationEngine('attach',
    {promptPosition : "topRight:-100", scroll: false, onValidationComplete: function(form, status){
      if (status) {

        
        var id=$(form).find("input").val();
        searchId(id);

      };
    }
  });

  $("#infoPacient").html('<ul data-role="listview" data-inset="true">'+
    '<li data-role="list-divider">'+
    //'<span class="ui-li-count">'+response.id+'</span>
    '</li>'+
    '<li><div idpacient="'+pacient.id+'" href="#history"><h2>'+
    pacient.name+
    '</h2>'+
    '<p><strong>'+
    pacient.typeid+': '+pacient.id+
    '</strong></p>'+
    '<p>'+
    'EPS: '+pacient.eps+
    '</p>'+
    '<p class="ui-li-aside"><strong>'+
    pacient.birthdate+' Años'+
    '</strong></p>'+
    '</div></li>');
  $("#infoPacient ul").listview();







});