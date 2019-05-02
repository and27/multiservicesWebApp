function writePublication() {
    var title = document.getElementById("titulo").value;
        var desc = document.getElementById("Descripcion").value;
        var cat=document.getElementById("categoria").value;
        var valor=document.getElementById("Valor").value;
        var storageRef = firebase.storage().ref();
        var i1 = document.getElementById("Imagen1");
        var i2 = document.getElementById("Imagen2");
        var fileRef1=storageRef.child(i1.files[0].name);
        var x=fileRef1.put(i1.files[0]);
        fileRef1.getDownloadURL().then(function(url) {
          var pic1=url;
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                // User is signed in.
                var name = user.displayName;
                var uid= user.uid;
              }
              var newPostKey="uid+cat+des";
              var write= firebase.database().ref("Publications/" + cat + "/" + newPostKey).set({
               userID: uid,
              username: name,
              title: title,
              description: desc,
              category: cat,
              valor: valor,
              pic1: pic1
                 });
            });
            alert("Se ha creado publicacion");
        }).catch(function(error){
            alter(error);
          }) ;
    
     
  }
  
  function actualizarIDpublicacion(ID) {
    firebase
      .database()
      .ref("ID")
      .set({
        IDpublic: ID
      });
  }