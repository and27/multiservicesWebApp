function newPopup(url,a) {
    popupWindow = window.open(
    url,'popUpWindow','height=300,width=400,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes')
    alert(a);
    }


function creartexto(img1,title1,desc1,precio1,cat,IDp,uid){
    
    var text= 
    ' <div  class="row pt-5"; >'+
    '<div class="col-md-2 offset-md-1">'+
    '<img src='+img1+'></div>' +
      '<div class="col-md-6">'+
          '<h4>'+title1+'</h4>'+
          '<p>'+desc1+'</p>'+
          '<h4>valor: $'+precio1+'</h4> </div>'+
      '<div class="col-md-2 offset-md-1">'+
      '<button onclick="verinteresados('+"'"+cat+"','"+IDp+"','"+uid+"'"+')">'+
      ' Buscar Postulantes</button> </div>'
       +'<div id='+IDp+'> </div>'; 
      
    return text;
    }
function verinteresados(cat,IDp,uid){
  
    var database = firebase.database().ref("Usuario/"+uid+"/Publication/"+cat+"/"+IDp).child('interesados');
    
    
    database.once('value').then(function(snapshot) {
       
        var c=0, d=0;
        var txt="";
        var contenido=document.getElementById(IDp);
        contenido.innerHTML= txt;
        snapshot.forEach(function(User) {
          d++; 
            var id=User.key
            var databas = firebase.database().ref("Usuario/"+id);
            txt="<div id="+IDp+d+"></div>";
           
            contenido.innerHTML= contenido.innerHTML+txt;
           
            databas.once('value',function(user) {
                
                text=' <div  class="row pt-5" ><div class="col-md-2 offset-md-1">';
                
                text=text+"<img  width='400px' src='" +user.child('photo').val()+"'</img></div>";
                text=text+'<div class="col-md-6">';
                text=text+"<h4> Nombre: "+user.child('UserName').val()+"</h4>";
                text=text+"<h4> Estrellas: "+user.child('star').val()+"</h4> </div>";
                text=text+"<button onclick='contratar("+'"'+id+"'"+")'>contratar</button></div>"
                c++;
              
                var cont=document.getElementById(IDp+c);
                cont.innerHTML=text;
               
            });
            
            
        
    
        database.child(User.key).child('interestedID').once('value',function(inter){
           
            //alert(inter.val())
            });
        });
        });
}

function publicar(cat,IDp){
    var contenido=document.getElementById('publicaciones');
    var txt=new Array();
    var database = firebase.database().ref("Publications/"+cat+"/"+IDp);
    database.once("value", function(child) {
        //TAKE ALL THE RESULTS ACCORDING TO THE CATEGORIE
        var desc1= (JSON.stringify(child.child("description")).split('"').join('')); 
        var title1=(JSON.stringify(child.child("title")).split('"').join(''));
        var img1=(JSON.stringify(child.child("pic1")));
        var precio1=JSON.stringify(child.child("valor"));
        contenido.innerHTML=creartexto(img1,title1,desc1,precio1,cat,IDp);     
      });
      

}
function Pusuario(){
    var texto=new Array();
    firebase.auth().onAuthStateChanged(function(user) {      
        var uid= user.uid;
        firebase.database().ref("Usuario/"+uid).child("Publication").once("value", function(snapshot) {
            snapshot.forEach(function(categoria) {   
                categoria.forEach(function(idpublicacion) {   
                    cat=categoria.key;
                    IDp=idpublicacion.key;
                    texto="";
                    var contenido=document.getElementById('publicaciones');
                    var database = firebase.database().ref("Publications/"+cat+"/"+IDp);
                    database.once("value", function(child) {
                        //TAKE ALL THE RESULTS ACCORDING TO THE CATEGORIE
                        
                        if(child.val()!=null){
                        var desc1= (JSON.stringify(child.child("description")).split('"').join('')); 
                        var title1=(JSON.stringify(child.child("title")).split('"').join(''));
                        var img1=(JSON.stringify(child.child("pic1")));
                        var precio1=JSON.stringify(child.child("valor"));
                        texto=creartexto(img1,title1,desc1,precio1,cat,IDp,uid)+texto; 
                        contenido.innerHTML=texto;   } 
                      });

                       
                });
            });
        });
    });
    //alert(texto[0]);    
}

function Request(){
    var texto=new Array();
    firebase.auth().onAuthStateChanged(function(user) {      
        var uid= user.uid;
        firebase.database().ref("Usuario/"+uid).child("request").once("value", function(snapshot) {
            snapshot.forEach(function(categoria) {   
                categoria.forEach(function(idpublicacion) {   
                    cat=categoria.key;
                    IDp=idpublicacion.key;
                    texto="";
                    var contenido=document.getElementById('publicaciones');
                    var txt=new Array();
                    var database = firebase.database().ref("Publications/"+cat+"/"+IDp);
                    database.once("value", function(child) {
                        //TAKE ALL THE RESULTS ACCORDING TO THE CATEGORIE
                        var desc1= (JSON.stringify(child.child("description")).split('"').join('')); 
                        var title1=(JSON.stringify(child.child("title")).split('"').join(''));
                        var img1=(JSON.stringify(child.child("pic1")));
                        var precio1=JSON.stringify(child.child("valor"));
                        texto=creartexto(img1,title1,desc1,precio1,cat,IDp,uid)+texto; 
                        contenido.innerHTML=texto;    
                      });

                       
                });
            });
        });
    });
    //alert(texto[0]);    
}