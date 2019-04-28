function publication(cat){
  
    var botones='<div class="row mt-5 text-center">';
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
        botones=botones+"<button onclick='verpublicacion("+'"'+cat+'"'+","+'"'+key[i]+'"'+")'; class='btn btn-primary'>ver más</button></div>"
  
      }
      contenido.innerHTML=botones+"</div>";
    });
  }
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
          
          if (child.key=="pic1" || child.key=="pic2"){
            imagenes=imagenes+"<img  src="+JSON.stringify(child).split('"').join('')+"/>";
          }
          else if(child.key=="userID"){
            useruid=JSON.stringify(child);
            text="<div class='container text-center pt-5'><div  style='background-color:white;' >  ";
          }
          else if(child.key=="username"){
           nombre= nombre+"<h4  onclick=f("+ useruid+")> Publicado por "+JSON.stringify(child).split('"').join('')+"</h4>";
          }
          else if(child.key=="title"){
            title=title+"<h1>"+JSON.stringify(child).split('"').join('')+"</h1> ";
          }
          else if(child.key=="categoria"){
            categoria=categoria+"<h3>"+cat+"</h3> ";
          }
          else if(child.key=="description"){
            desc=desc+"<h3>"+JSON.stringify(child).split('"').join('')+"</h3> ";
          }
         });
        text=text+title+desc+imagenes+nombre;
  
  
      contenido.innerHTML= text+'</div></div></div><button onclick="aplicar();" class="btn btn-primary">Buscar</button></p>';
     
    });
  }
  
  