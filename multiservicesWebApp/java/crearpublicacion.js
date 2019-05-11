function writePublication() {
        var title = document.getElementById("titulo").value;
        var desc = document.getElementById("Descripcion").value;
        var cat=document.getElementById("categoria").value;
        var valor=parseFloat(document.getElementById("Valor").value);
        var storageRef = firebase.storage().ref();
        var i1 = document.getElementById("Imagen1");
        if (i1.files[0]==undefined){
          var newPostKey = firebase.database().ref().child("Publications/"+cat).push().key;
          var pic1="https://firebasestorage.googleapis.com/v0/b/fabulus-a7471.appspot.com/o/User.png?alt=media&token=7b1139ef-c179-4527-b7a6-1ddae8b8b79d";
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                var uid= user.uid;
                agregaraPerfil(uid, cat, newPostKey, title);
                var data=firebase.database().ref("Usuario/"+uid).child('UserName');
                data.once("value", function(user) {  
                  var name=user.val();   
                  var data=firebase.database().ref("Usuario/"+uid).child('star');           
                 data.once("value", function(star) {
                   
                  var starr=star.val();
                  var write= firebase.database().ref("Publications/" + cat + "/" + newPostKey).set({
                    userID: uid,
                    username: name,
                    star: starr,
                    title: title,
                    description: desc,
                    category: cat,
                    valor: valor,
                    pic1: pic1
                       }).then(alert("Se ha creado publicacion"));
  
                  });
                });
               
                             
            }
          }); 
        }
       else{
        var fileRef1=storageRef.child(i1.files[0].name);
        x=fileRef1.put(i1.files[0]);
        var newPostKey = firebase.database().ref().child("Publications/"+cat).push().key;
        fileRef1.getDownloadURL().then(function(url) {
          var pic1=url;
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                var uid= user.uid;
                agregaraPerfil(uid, cat, newPostKey, title);
                var data=firebase.database().ref("Usuario/"+uid).child('UserName');
                data.once("value", function(user) {  
                  var name=user.val();   
                  var data=firebase.database().ref("Usuario/"+uid).child('star');           
                 data.once("value", function(star) {
                   
                  var starr=star.val();
                  var write= firebase.database().ref("Publications/" + cat + "/" + newPostKey).set({
                    userID: uid,
                    username: name,
                    star: starr,
                    title: title,
                    description: desc,
                    category: cat,
                    valor: valor,
                    pic1: pic1
                       }).then(alert("Se ha creado publicacion"));
  
                  });
                });
                        
              }
            });
        });   
      }
  }
  function agregaraPerfil(uid, cat, key, title) {
    firebase
      .database()
      .ref("Usuario/" + uid + "/" + "Publication" + "/" + cat + "/" + key)
      .set({
        titulo: title
      });
  }
  
  function actualizarIDpublicacion(ID) {
    firebase
      .database()
      .ref("ID")
      .set({
        IDpublic: ID
      });
  }