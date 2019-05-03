function publication(cat){
  
    var botones="<div id='contenedor'><div class='row pt-5'>";
    var Descripcion=new Array();
    var Titulo=new Array();
    var img=new Array();
    var key=new Array();
    var contenido=document.getElementById('botones')
    var database = firebase.database().ref("Publications/"+cat);
    database.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
        //TAKE ALL THE RESULTS ACCORDING TO THE CATEGORIE
        Descripcion.push(JSON.stringify(child.child("description")).split('"').join('')); 
        Titulo.push(JSON.stringify(child.child("title")).split('"').join(''));
        img.push(JSON.stringify(child.child("pic1")));
        key.push(child.key);
      });
      var contenido=document.getElementById('new');
      // crea un arreglo con secciones que se vera en el documento html
      for (var i=0;i<Titulo.length;i++){
        botones=botones+"<div class='col-md-4 p-5'; style='background-color:white;  onclick=verpublicacion('"+key[i]+"')><img src="+img[i]+"height='70px' width='70px'> <h2>"+ Titulo[i]+"</h2> <p class='text-left'>"+ Descripcion[i]+"</p>  ";
        botones=botones+"<button onclick='verpublicacion("+'"'+cat+'"'+","+'"'+key[i]+'"'+")'; class='btn btn-danger my-2 my-sm-0'>ver más</button></div>"
  
      }
      contenido.innerHTML=botones+'</div><input type="button" value="Ir a inicio" onClick="location.href=location.href">';
    });
  }
test="img/User.png";
    function verpublicacion(cat,key){
     
      var contenido=document.getElementById('new');
      var useruid;
      var text=" ";
      var imagenes=" ";
      var nombre=" ";
      var title=" ";
      var desc=" ";
      var database = firebase.database().ref("Publications/"+cat).child(key);
      database.once("value", function(snapshot) {
        snapshot.forEach(function(child) {

          //contenido.innerHTML="<div class='row pt-5'>"
          
          if (child.key=="pic1"){
            imagenes=imagenes+"<div class='col-md-2 offset-md-1' align='left'><img  src="+JSON.stringify(child).split('"').join('')+"/></div>";
          }

          
          else if(child.key=="userID"){
            useruid=JSON.stringify(child);
            text=" <div  style='background-color:white;' > <div class='row pt-5'> ";
          }
          else if(child.key=="username"){
           nombre= nombre+"<p  onclick=f("+ useruid+")> Publicado por "+JSON.stringify(child).split('"').join('')+"</p></div>";
          }
          else if(child.key=="title"){
            title=title+"<div class='col-md-6'>  <h3>"+JSON.stringify(child).split('"').join('')+"</h3> ";
          }
          else if(child.key=="categoria"){
            categoria=categoria+"<h4>"+cat+"</h4> ";
          }
          else if(child.key=="description"){
            desc=desc+"<p>"+JSON.stringify(child).split('"').join('')+"</p> ";
          }
          else if(child.key=="valor"){
          valor="<div class='col-md-2 offset-md-1' >"+"<h4 align='right'>$"+JSON.stringify(child).split('"').join('')+"</h4>"+"</div>";
          }
         });
        text=text+imagenes+title+desc+nombre+valor;

      //Enviar Id de la publicacion e ID del Usuario
  
      contenido.innerHTML= text+'</div></div><input type="button" value="Regresar" onClick="history.back()" ></p>';


      contenido.innerHTML = contenido.innerHTML+
      "<center><button onclick=aplicar(" +
      useruid +
      "," +
      '"' +
      key +
      '"' +
      "," +
      '"' +
      cat +
      '"' +
      "); class='btn btn-primary'>Aplicar</button></center></p>";
  });
}
function aplicar(publicador, key, cat) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var uid = user.uid;
    }

    aplicar2(cat, key, uid, publicador);

    firebase
      .database()
      .ref(
        "Usuario/" +
          publicador +
          "/Publication/" +
          cat +
          "/" +
          key +
          "/interesados/" +
          uid
      )
      .set({
        interestedID: 0
      });
  })
  alert("¡Has aplicado a la oferta de trabajo!");
  location.href = "main.html";
}

function aplicar2(cat, key, uid, publicador) {
  firebase
    .database()
    .ref("Usuario/" + uid + "/request/" + cat + "/" + key)
    .set({
      interested: 0,
      from: publicador
    });
}
  
  