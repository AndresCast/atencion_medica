//var home="http://monkeyrate.co/server";
var home="http://localhost/atencion_medica/server";
var server=home+"/index.php/";
$.mobile.defaultPageTransition = "slidefade"; 


function loadingOpen(legend){

  $.mobile.loading( 'show', {
    text: legend,
    textVisible: true,
    theme: 'a',
    html: ""
  });
}

function loadingClose(){

  $.mobile.loading( 'hide' );

}



function changePage(page){

  if(navigator.userAgent.match(/OS/i) || navigator.userAgent.match(/Android/i)){



    $.mobile.changePage(page);
  }else{
     window.location.href = page;
  }
}

function customAlert(message)
{
  if(navigator.userAgent.match(/OS/i) || navigator.userAgent.match(/Android/i)){
    
    navigator.notification.vibrate(1000);

    function alertDismissed() {
    }

    navigator.notification.alert(message,
      alertDismissed,
      'Alerta Monkeyrate',
      'Cerrar'
      );

  }else{

    alert(message);
  }
}


function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}