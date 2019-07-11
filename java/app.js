
function userno(){
  var contenido=document.getElementById('usuario')
 contenido.innerHTML=`
  <p>Usuario no autentificado</p>
  <h3>Si no encuentras tu email de autentificacion solicita otro en el siguiente boton</h3>
  <button onclick="verificar()" >Solicitar email de autentificacion</button> 
  `;
} 
function forget(){
  
  var auth = firebase.auth();
  //var emailAddress = "martin.velez@yachaytech.edu.ec";
  var email=document.getElementById('correo').value;
  console.log(email);
  alert("Se ha solicitado a "+email);
auth.sendPasswordResetEmail(email).then(function() {
  alert("Se ha enviado el correo a "+ email); 
  window.location.replace("index.html");
}).catch(function(error) {
  alert("No se ha podido aceptar solicitud")
});

}
function regresarindex(){
  
  window.location.replace("index.html");

}
function setCookie(cname, cvalue) {
  
  document.cookie = cname + "=" + cvalue + ";" ;
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);

  var ca = decodedCookie.split(';');
  alert(ca);
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
 function createboardpublication(){ 
  var cat="Limpieza";
  var text=new Array();
  document.cookie="categoria="+cat;
  //var categoria=getCookie("Categoria");
  
  var contenido=document.getElementById('publicaciones')
  contenido.innerHTML="<p>Bienvenido </p>" ;
  var database = firebase.database();
  //var usersCollectionRef = database.collection('categorias');
  publicacion=database.ref('/Publicacion/Categoria/'+cat+'/');
  database.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    text.push(child.key);
  });
  var botones="";
    });


    //console.log(publicacion);

}


function ingresar(){
  var email= document.getElementById('email1').value;
  var password=document.getElementById('contra1').value;

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
   window.location.replace("main.html");
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    
  });
  //ver();
}
function ver(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      if (user.emailVerified) window.location.replace("categorias.html");
      else userno();
    } else {
      window.location.replace("index.html");
    }
  });
}

function autentificado(displayName){
  //var contenido=document.getElementById('usuario')
  //alert(displayName);
  document.documentElement.innerHTML="<p>Bienvenido"+ "u"+"</p>";
}
function cerrar(){
  firebase.auth().signOut().then(function(){
    console.log("bye");
    window.location.replace("index.html");
  }).catch(function(error){
    alert(error);
  }) 
}
function verificar(){
  var user=firebase.auth().currentUser;
  user.sendEmailVerification().catch(function(error){console.log(error);})
}
/*
function registrar(){
var contenido=document.getElementById('registro')
  
  contenido.innerHTML=`
  <h4>Registro de usuarios</h4>
  <input id="email" type="email" placeholder="Email">
  <input id="contra" type="password" placeholder="Contraseña">   
  <button onclick="register()">Registrarse</button>  
  <button onclick="facebook()">Autenticar con Facebook</button>
  <script src="app.js"></script>
  `;
}*/
function register(){
 
  var email= document.getElementById('email').value;
  var password=document.getElementById('contra').value;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function()
    { alert("Se ha enviado un correo de autentificacion a "+email+" por favor ingresa a tu correo para validar la cuenta")
    window.location.replace("index.html");

    }).catch(function(error) {
      
      // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
 
    // ...
  });
  
}
