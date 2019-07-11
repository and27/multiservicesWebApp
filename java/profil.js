function newPopup(url,a) {
    popupWindow = window.open(
      url,'popUpWindow','height=300,width=400,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes')
  alert(a);
    }


function creartexto(img1,title1,desc1,precio1){
    
    var text= 
    ' <div class="row pt-5" ><div class="col-md-2 offset-md-1">'+
    '<img src='+img1+'></div>' +
      '<div class="col-md-6">'+
          '<h4>'+title1+'</h4>'+
          '<p>'+desc1+'</p></div>'+
      '<div class="col-md-2 offset-md-1">'+
          '<h3>'+precio1+'</h3>'+
      '</div> </div>';
    
    return text;
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
        contenido.innerHTML=creartexto(img1,title1,desc1,precio1);     
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
                    var txt=new Array();
                    var database = firebase.database().ref("Publications/"+cat+"/"+IDp);
                    database.once("value", function(child) {
                        //TAKE ALL THE RESULTS ACCORDING TO THE CATEGORIE
                        var desc1= (JSON.stringify(child.child("description")).split('"').join('')); 
                        var title1=(JSON.stringify(child.child("title")).split('"').join(''));
                        var img1=(JSON.stringify(child.child("pic1")));
                        var precio1=JSON.stringify(child.child("valor"));
                        texto=creartexto(img1,title1,desc1,precio1)+texto; 
                        contenido.innerHTML=texto;    
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
                        texto=creartexto(img1,title1,desc1,precio1)+texto; 
                        contenido.innerHTML=texto;    
                      });

                       
                });
            });
        });
    });
    //alert(texto[0]);    
}